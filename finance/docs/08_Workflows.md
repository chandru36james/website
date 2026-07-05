# 08. Operational Workflows & Control Policies

This document specifies the exact step-by-step procedures required to execute high-stakes microfinance transactions in VYFL, ensuring compliance and data safety.

---

## 📈 1. Customer Onboarding & KYC Control
1. **Initial Verification**: The Loan Officer gathers physical identification cards.
2. **Form Entry**: Loan Officer inputs details. The system enforces validation on `nationalId` (must be unique).
3. **Branch Assignment**: The system automatically assigns the customer to the logged-in user's active branch.
4. **Risk Grading**: Risk grade (Low, Medium, High) is computed based on historical credit flags and collateral ratio.

---

## 🔄 2. Transaction Reversal Policy

> [!CAUTION]
> **Hard-deletions of financial transactions are strictly prohibited in VYFL.** 
> Once a payment or ledger entry is posted, it becomes an immutable part of the audit trail. Mistakes must be corrected using offset reversals.

```
[Original Transaction]  ──>  [Manager Authorizes]  ──>  [Reverse Entry Posted]
  Debit: Cash  $500            (Selects Reversal)         Debit: Cash -$500
  Credit: Loan $500                                       Credit: Loan -$500
```

* **Wrong Payment Entry**:
  * User selects the erroneous transaction in the Ledger or Customer account and clicks "Initiate Reversal".
  * The system creates an exact mirroring ledger transaction with a negative value, referencing the original ID.
  * A correction entry is then posted with the corrected parameters.
* **Status Updates**: The original transaction changes its state to `Reversed`.

---

## 🎫 3. Receipt Generation & Cancellation Rules

### A. Structured Sequence Format
Receipt numbers are generated automatically at the point of transaction collection and conform to a rigid institutional standard:
* **Format**: `{BranchCode}-{YYYY}-{MMDD}-{Sequential4Digits}`
  * `BranchCode`: The 5-character alphanumeric identifier of the operating branch (e.g. `CM001`).
  * `YYYY`: The 4-digit calendar year of the transaction (e.g. `2026`).
  * `MMDD`: The 4-digit calendar month and day of the transaction (e.g. `0630`).
  * `Sequential4Digits`: A daily zero-padded sequential counter (e.g. `0047`).
* **Sequence Control**: The sequential counter resets to `0001` daily at 00:00 local time per branch. 
* **Gap Protection**: Receipt generation uses database sequence locking or client-side synchronized indices to prevent duplicate number generation or missing slots in fiscal logging.

### B. Receipt Cancellation
Receipt numbers represent structured fiscal sequences. They can never disappear or be hard-deleted from the database.

1. **State Transition**: A receipt can transition from `Active` to `Cancelled`.
2. **Documentation Requirement**: The accountant or officer must enter a comprehensive, non-blank audit reason string.
3. **Approval**: A Branch Manager must review and sign off on the cancellation.
4. **Visual Indicator**: The ticket retains its sequential receipt number slot in reports but is marked with a red strike-through and a `Cancelled` status badge.

---

## 🏚️ 4. Write-Off Workflow

When a loan enters advanced delinquency (NPA classification after 180 days), the outstanding principal is classified as bad debt.

```
 [180+ Days Delinquency]
            │
            ▼
 [Manager Recommendation] ──> Enters justification details & collateral liquidation value
            │
            ▼
 [Super Admin Approval]  ──> Reviews, clicks "Authorize Write-Off"
            │
            ▼
 [Ledger Journal Posting] ──> Debits: Bad Debt Expense Account
                              Credits: Loans Receivable Outstanding
```

* **Impact**: The loan status changes to `Written_Off`. Amortization schedule lines freeze further penalty calculations.

---

## 🔄 5. Loan Lifecycle State Machine & Transitions

To ensure strict operational integrity, loans must follow a predictable, rule-enforced state machine:

```
[DRAFT] ────► [PENDING] ────► [APPROVED] ────► [DISBURSED] ────► [ACTIVE]
                                   │                                │
                                   ▼                                ▼
                              [CANCELLED]                       [OVERDUE] ◄──► [ACTIVE]
                                                                    │
                                                           ┌────────┴────────┐
                                                           ▼                 ▼
                                                      [SETTLED]        [WRITTEN_OFF]
```

### Transition Triggers and Enforcement:
1. **DRAFT → PENDING**: Initiated manually by a Loan Officer once the application form and collateral checklist are completed.
2. **PENDING → APPROVED**: Reviewed and approved manually by a Branch Manager after verifying borrower KYC and underwriting criteria.
3. **APPROVED → CANCELLED**: Triggered manually by a Manager if the loan is abandoned or the customer retracts prior to funding.
4. **APPROVED → DISBURSED**: Triggered automatically once the Accountant posts the disbursement voucher and releases principal cash/transfer to the borrower.
5. **DISBURSED → ACTIVE**: Immediate automatic transition upon posting of the disbursement. Generates the live immutable schedule lines.
6. **ACTIVE → OVERDUE**: Automatic transition triggered by the system rules engine when any installment remains unpaid past its due date and exceeds the allowed Grace Period ($G$ days).
7. **OVERDUE → ACTIVE**: Automatic transition back to active status immediately upon receipt of a repayment that covers all outstanding overdue balances.
8. **ACTIVE/OVERDUE → SETTLED**: Automatic transition triggered immediately when the outstanding principal, interest, and penalty balances on all schedule lines reach exactly $0.00$.
9. **ACTIVE/OVERDUE → WRITTEN_OFF**: Manual workflow triggered by a Manager's recommendation and authorized by a Super Admin for loans classified in the Loss/NPA category (180+ days past due). This freezes all amortization schedules and future penalty accruals.

