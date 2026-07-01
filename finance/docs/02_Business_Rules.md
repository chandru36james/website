# 02. Business Rules & Financial Policy Specification

VGot You Finance enforces strict financial policies to maintain institutional safety and prevent usurious lending or non-compliant operations. This specification covers pricing bands, limits, and calculation frequencies.

---

## 📊 1. Standard Pricing Bands & Constraints

The system rules engine controls parameters that apply to all loan products. These boundaries cannot be overridden by loan officers during application entry.

| Parameter | Minimum Value | Maximum Value | Default Value | Enforced By |
| :--- | :---: | :---: | :---: | :--- |
| **Principal Amount** | $50.00 | $25,000.00 | $1,000.00 | System Rule Engine |
| **Annual Interest Rate** | $5.00\%$ | $36.00\%$ | $18.00\%$ | System Rule Engine |
| **Loan Term (Duration)** | 1 Month | 36 Months | 12 Months | System Rule Engine |
| **Grace Period** | 0 Days | 15 Days | 3 Days | System Rule Engine |
| **Penalty Rate (Per Unit)** | $0.00\%$ | $5.00\%$ | $1.50\%$ | Super Admin (System Rule Engine) |
| **Penalty Type** | — | — | `DAILY_PERCENTAGE` | Super Admin (System Rule Engine) |
| **Early Settlement Discount** | $0.00\%$ | $10.00\%$ | $5.00\%$ | Manager Underwriting |
| **Collateral-to-Loan Ratio** | $100.00\%$ | $\infty$ | $120.00\%$ | Manager Underwriting |

*Note: Penalty Type enums allowed are `DAILY_PERCENTAGE` or `MONTHLY_PERCENTAGE`. Penalties accrue strictly on the overdue installment balance.*

---

## 📅 2. Interest Frequencies & Compound Periods

Repayment frequencies dictate when amortization lines are drawn. Interest is calculated using standard annual divisions to establish the periodic rate $r$ based on the annual interest rate $R$:

* **Weekly Frequency**: An installment occurs every 7 calendar days. Periodic rate is calculated as:
  $$r = \frac{R}{52 \times 100}$$
* **Bi-Weekly Frequency**: An installment occurs every 14 calendar days. Periodic rate is calculated as:
  $$r = \frac{R}{26 \times 100}$$
  *(Calculated strictly on 26 bi-weekly periods per year to maintain parity).*
* **Monthly Frequency**: An installment occurs on the same numerical date of each calendar month. Periodic rate is calculated as:
  $$r = \frac{R}{12 \times 100}$$
* **Quarterly Frequency**: An installment occurs every 3 calendar months. Periodic rate is calculated as:
  $$r = \frac{R}{4 \times 100}$$

---

## 🚨 3. Non-Performing Asset (NPA) and Aging Classifications

A loan is classified into risk categories automatically based on the age of its oldest unpaid installment:

```
   [0 Days] ──> [Grace Period] ──> [1 - 30 Days] ──> [31 - 90 Days] ──> [91+ Days]
   Standard        Grace Days         Substandard       Doubtful           Loss (NPA)
```

1. **Standard (Active/Current)**: All installments paid in full, or oldest unpaid installment is within $0$ to $30$ days overdue.
2. **Substandard (Overdue Category I)**: Oldest unpaid installment is $31$ to $90$ days overdue. Impairment provisions of $15\%$ are typically applied.
3. **Doubtful (Overdue Category II)**: Oldest unpaid installment is $91$ to $180$ days overdue. Impairment provisions of $50\%$ applied.
4. **Loss / Non-Performing Asset (NPA)**: Overdue by $180+$ days, or manually flagged by a Manager as uncollectible. Triggers the Write-Off Workflow.
