# 06. Financial Calculations & Loan Ledger Engine

This document outlines the formulas, immutable loan snapshots, payment distributions, and settlement modules driving the VYFL engine.

---

## 📐 1. Amortization Mechanics & Mathematical Formulas

Let:
* $P$ = Disbursed Principal
* $R$ = Annual Interest Rate (expressed as percentage)
* $T$ = Duration in months
* $n$ = Total installment terms (e.g. for monthly terms over $T$ months, $n = T$)
* $r$ = Periodic interest rate, derived strictly by repayment frequency as defined below.

### Periodic Interest Rate ($r$) Calculations by Repayment Frequency
To prevent amortization mismatches and financial leakage, the periodic interest rate $r$ must be explicitly computed using standard annual divisions:
* **Weekly**: $r = \frac{R}{52 \times 100}$ (52 weekly periods per year)
* **Bi-Weekly**: $r = \frac{R}{26 \times 100}$ (26 bi-weekly periods per year)
* **Monthly**: $r = \frac{R}{12 \times 100}$ (12 monthly periods per year)
* **Quarterly**: $r = \frac{R}{4 \times 100}$ (4 quarterly periods per year)

---

### A. Flat Interest Method
Principal and interest due are divided equally across the terms.
* **Total Interest ($I_{\text{tot}}$)**:
  $$I_{\text{tot}} = P \times \frac{R}{100} \times \frac{T}{12}$$
* **Monthly Installment Amount ($M_{\text{emi}}$)**:
  $$M_{\text{emi}} = \frac{P + I_{\text{tot}}}{n}$$
* **Per Installment Due**:
  $$\text{Principal}_i = \frac{P}{n}, \quad \text{Interest}_i = \frac{I_{\text{tot}}}{n}$$

### B. Reducing Balance Method (Amortized / EMI)
Interest is calculated dynamically on the outstanding principal balance at the beginning of each term.
* **Monthly Equated Installment ($M_{\text{emi}}$)**:
  $$M_{\text{emi}} = \frac{P \times r \times (1 + r)^n}{(1 + r)^n - 1}$$
* **Schedule Calculation Loop**:
  For each period $i \in \{1, 2, \dots, n\}$:
  * Interest due:
    $$\text{Interest}_i = P_{\text{rem}, i-1} \times r$$
  * Principal due:
    $$\text{Principal}_i = M_{\text{emi}} - \text{Interest}_i$$
  * Remaining principal:
    $$P_{\text{rem}, i} = P_{\text{rem}, i-1} - \text{Principal}_i$$
    Where $P_{\text{rem}, 0} = P$.

### C. Simple Interest Method
Interest portion is calculated as a fixed amount per period on the disbursed principal, without compounding on outstanding arrears.
* **Total Interest ($I_{\text{tot}}$)**:
  $$I_{\text{tot}} = P \times \left(\frac{R}{100}\right) \times \left(\frac{T}{12}\right)$$
* **Schedule Calculation Loop**:
  For each period $i \in \{1, 2, \dots, n\}$:
  * Interest due:
    $$\text{Interest}_i = \frac{I_{\text{tot}}}{n}$$
  * Principal due:
    $$\text{Principal}_i = \frac{P}{n}$$
  * Remaining principal:
    $$P_{\text{rem}, i} = P_{\text{rem}, i-1} - \text{Principal}_i$$
    Where $P_{\text{rem}, 0} = P$. Interest does not compound and does not accumulate on top of unpaid interest from prior periods.

### D. Compound Interest Method
Interest accrues on both the unpaid principal balance and accumulated unpaid interest from prior periods (compounding frequency matches repayment frequency).
* **Period Ending Value ($A$)**:
  $$A = P \times (1 + r)^n$$
* **Schedule Calculation Loop**:
  For each period $i \in \{1, 2, \dots, n\}$:
  * Total Compounded Balance ($B_{i-1}$):
    $$B_{i-1} = P_{\text{rem}, i-1} + \text{Unpaid Interest Arrears}_{i-1}$$
  * Interest due:
    $$\text{Interest}_i = B_{i-1} \times r$$
  * Equated Installment ($M_{\text{emi}}$) calculated as:
    $$M_{\text{emi}} = \frac{P \times r \times (1 + r)^n}{(1 + r)^n - 1}$$
  * Principal due:
    $$\text{Principal}_i = M_{\text{emi}} - \text{Interest}_i$$
  * Remaining principal:
    $$P_{\text{rem}, i} = P_{\text{rem}, i-1} - \text{Principal}_i$$
    Where $P_{\text{rem}, 0} = P$.

---

## 🚨 2. Overdue Penalties & Grace Periods

If an installment's status remains unpaid beyond its due date by more than $G$ days (Grace Period), penalties accrue.

### Defining Penalty Variables
To ensure zero structural ambiguity, the system rules engine defines the following variables:
* **Penalty Rate**: A decimal percentage value. Valid range is $0.0\%$ to $5.0\%$ (Default is $1.5\%$).
* **Penalty Type**: Enum: `DAILY_PERCENTAGE` or `MONTHLY_PERCENTAGE`.
* **Authorization**: Global penalty parameters are set exclusively by the Super Admin via the System Rule Engine, then saved in the immutable `rulesSnapshot` of the loan record at disbursement.

### Calculations:
1. **Daily Percentage Penalty** (`DAILY_PERCENTAGE`):
   $$\text{Penalty Due} = \text{Outstanding Amount} \times \left(\frac{\text{Penalty Rate}}{100}\right) \times (\text{Days Overdue} - G)$$
2. **Monthly Percentage Penalty** (`MONTHLY_PERCENTAGE`):
   $$\text{Penalty Due} = \text{Outstanding Amount} \times \left(\frac{\text{Penalty Rate}}{100}\right) \times \left\lceil \frac{\text{Days Overdue} - G}{30} \right\rceil$$

---

## 🛡️ 3. Immutable Loan Rule Snapshots

To prevent historical audits from breaking when administrators update global rules (e.g. changing maximum interest rates from $18\%$ to $24\%$ or shifting penalty formulas), **every loan record stores a complete, immutable snapshot of the active rules at the exact second of its disbursement**.

```json
{
  "id": "loan-881273",
  "amount": 2500.00,
  "interestRate": 15.00,
  "interestType": "REDUCING",
  "disbursedAt": "2026-06-30T08:31:11Z",
  "rulesSnapshot": {
    "ruleVersionId": "v1.4-Colombo",
    "gracePeriodDays": 3,
    "penaltyRate": 1.5,
    "penaltyType": "DAILY_PERCENTAGE",
    "allocationPriority": ["Penalty", "Interest", "Principal"],
    "earlySettlementDiscount": 0.05
  }
}
```

Even if the institution alters its system rules to a $5$-day grace period and $2.0\%$ penalty later, the schedule calculations for loan `loan-881273` continue to evaluate against the immutable `rulesSnapshot`.

---

## 💳 4. Payment Allocation Priority

When a borrower pays an amount $A$, the payment is distributed down the installment list, starting from the oldest unpaid schedule line. Within each schedule line, the amount is allocated according to the priority: **Penalty $\rightarrow$ Interest $\rightarrow$ Principal**.

Let $A$ be the collected payment:
1. **Allocate to Penalty**:
   $$\text{Allocated to Penalty} = \min(A, \text{Penalty Outstanding})$$
   $$A_{\text{next}} = A - \text{Allocated to Penalty}$$
2. **Allocate to Interest**:
   $$\text{Allocated to Interest} = \min(A_{\text{next}}, \text{Interest Outstanding})$$
   $$A_{\text{final}} = A_{\text{next}} - \text{Allocated to Interest}$$
3. **Allocate to Principal**:
   $$\text{Allocated to Principal} = \min(A_{\text{final}}, \text{Principal Outstanding})$$

---

## 💵 5. Early Settlement & Waiver Module

Many borrowers request early settlement or discounts. VYFL supports specialized early closure workflows:

* **Early Closure Discount**: If a customer settles their entire outstanding loan ahead of schedule, unearned future interest is waived. A settlement discount (ranging from $0.0\%$ to $10.0\%$, with a default of $5\%$ or $0.05$) can be authorized by a Manager.
  * **Calculation Base**: This discount percentage is applied strictly to the remaining **outstanding principal balance** only. Any accrued penalties or outstanding interest up to the settlement date are excluded from the discount and must either be paid in full or waived explicitly by the Manager (requiring documented audit justification).
* **One-Time Settlement (OTS)**: For distressed accounts, a Manager can negotiate a lump-sum amount lower than the total balance. The remaining outstanding balance is written off, posting specialized corrective accounts entries.
