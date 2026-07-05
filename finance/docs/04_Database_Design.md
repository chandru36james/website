# 04. Database Design & Entity Relationship Specifications

This document defines the physical relational schema and entity relationships representing VGot You Finance's core microfinance engine.

---

## 📊 1. Entity Relationship (ER) Diagram

```
 +------------------+           +------------------+           +------------------+
 |     branches     |           |      users       |           |    customers     |
 +------------------+           +------------------+           +------------------+
 | PK  id           |<----+     | PK  id           |<----+     | PK  id           |<----+
 |     name         |     |     |     email        |     |     |     first_name   |     |
 |     code         |     |     |     role         |     |     |     last_name    |     |
 +------------------+     |     | FK  branch_id    |     |     |     national_id  |     |
                          |     +------------------+     |     | FK  branch_id    |----+|
                          |                              |     +------------------+    ||
                          |     +------------------+     |                             ||
                          |     |  audit_logs      |     |     +------------------+    ||
                          |     +------------------+     |     |   collaterals    |    ||
                          |     | PK  id           |     |     +------------------+    ||
                          |     | FK  user_id      |-----+     | PK  id           |    ||
                          |     |     action       |           | FK  customer_id  |----+|
                          |     |     details      |           |     status       |     |
                          |     +------------------+           |     valuation    |     |
                          |                                    +------------------+     |
                          |     +------------------+                                    |
                          |     |    loans         |                                    |
                          |     +------------------+                                    |
                          |     | PK  id           |                                    |
                          +-----| FK  branch_id    |                                    |
                                | FK  customer_id  |------------------------------------+
                                |     status       |
                                |     amount       |
                                +------------------+
                                         |
                                         | 1 (Loan)
                                         |
                                         | N (Installments)
                                         v
                                +------------------+           +------------------+
                                |  loan_schedule   |           |     payments     |
                                +------------------+           +------------------+
                                | PK  id           |<----+     | PK  id           |<----+
                                | FK  loan_id      |     |     | FK  loan_id      |     |
                                |     due_date     |     |     |     amount       |     |
                                |     principal    |     |     |     receipt_no   |     |
                                |     interest     |     |     +------------------+     |
                                +------------------+     |                              |
                                                         |                              |
                                                         |                              |
                                                1        | N                    1       | N
                                              +---------------+               +---------------+
                                              | payment_alloc |               |  ledger_entr  |
                                              +---------------+               +---------------+
                                              | PK  id        |               | PK  id        |
                                              | FK  sched_id  |               | FK  payment_id|
                                              | FK  payment_id|               |     account   |
                                              |     amount    |               |     debit     |
                                              |     type      |               |     credit    |
                                              +---------------+               +---------------+
```

---

## 🗄️ 2. Detailed Table Specifications

### A. table: `branches`
Represents physical operating branches of the microfinance institution.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique ID (UUID or custom branch code) |
| `name` | VARCHAR(100) | | No | e.g., "Colombo Main", "Jaffna Central" |
| `code` | VARCHAR(10) | | No | Unique visual code (e.g., "CM-001") |
| `created_at` | TIMESTAMP | | No | Default current_timestamp |

### B. table: `users`
System operator profiles.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Matches Firebase Auth UID |
| `email` | VARCHAR(100) | | No | Unique index |
| `name` | VARCHAR(100) | | No | Full name |
| `role` | VARCHAR(20) | | No | Enum: Super Admin, Manager, Loan Officer, Accountant, Auditor |
| `branch_id` | VARCHAR(50) | FK | No | References `branches(id)` |
| `status` | VARCHAR(20) | | No | Enum: Active, Inactive, Suspended |

### C. table: `customers`
Borrower register. Includes critical regulatory KYC fields.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique UUID |
| `branch_id` | VARCHAR(50) | FK | No | References `branches(id)` |
| `first_name` | VARCHAR(50) | | No | First name |
| `last_name` | VARCHAR(50) | | No | Last name |
| `email` | VARCHAR(100) | | Yes | Email address (unique index) |
| `national_id` | VARCHAR(30) | | No | Unique identification number (National Card / Passport) |
| `aadhaar_no` | VARCHAR(20) | | Yes | Masked Aadhaar identifier (e.g. `XXXX-XXXX-1234`) |
| `pan_no` | VARCHAR(20) | | Yes | Masked Permanent Account Number (e.g. `XXXXX1234X`) |
| `phone` | VARCHAR(20) | | No | Contact number |
| `address` | TEXT | | Yes | Primary residential address |
| `dob` | DATE | | Yes | Customer date of birth |
| `gender` | VARCHAR(10) | | Yes | Gender |
| `nominee` | VARCHAR(100) | | Yes | Nominee beneficiary name |
| `monthly_income`| DECIMAL(12,2) | | Yes | Household monthly income |
| `occupation` | VARCHAR(50) | | Yes | Employment sector / Occupation |
| `risk_grade` | VARCHAR(10) | | No | Enum: Low, Medium, High |
| `status` | VARCHAR(20) | | No | Enum: Active, Suspended, Blacklisted |

---

### D. table: `loans`
Principal lending ledger container.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique UUID |
| `customer_id` | VARCHAR(50) | FK | No | References `customers(id)` |
| `branch_id` | VARCHAR(50) | FK | No | References `branches(id)` |
| `amount` | DECIMAL(12,2) | | No | Disbursed principal |
| `interest_rate`| DECIMAL(5,2) | | No | Annual Interest Percentage |
| `interest_type`| VARCHAR(20) | | No | Enum: FLAT, REDUCING, COMPOUND, SIMPLE |
| `term_months` | INTEGER | | No | Loan duration in months |
| `status` | VARCHAR(20) | | No | Loan Status State (detailed below) |
| `disbursed_at`| TIMESTAMP | | Yes | Actual date of disbursement |
| `rules_snapshot`| JSON | | No | Immutable copy of rules in force at disbursement |

#### 🔄 Loan Status State Machine
Loans transit through a strict, auditable sequence of life-cycle states:
* **DRAFT**: Initial application entry.
* **PENDING**: Submitted for underwriting and review.
* **APPROVED**: Recommended and signed-off by Branch Manager.
* **CANCELLED**: Terminated from APPROVED status (if disbursement does not occur).
* **DISBURSED**: Principal funds paid to borrower. Immediately transitions to **ACTIVE**.
* **ACTIVE**: Current running loan. All schedules paid on time or within the grace period.
* **OVERDUE**: Oldest unpaid installment exceeds the allowed grace period (triggers automatically). Transitions back to **ACTIVE** once all overdue installments are paid in full.
* **SETTLED**: Fully discharged. Outstanding balance reaches $0.00 (triggers automatically upon last payment clearance).
* **WRITTEN_OFF**: Deemed uncollectible after 180 days of delinquency. Requires manual Manager recommendation and Super Admin approval.

---

### E. table: `loan_schedule`
Amortization schedule installments.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique UUID |
| `loan_id` | VARCHAR(50) | FK | No | References `loans(id)` (Index) |
| `period_no` | INTEGER | | No | Installment sequence number |
| `due_date` | DATE | | No | Due date |
| `principal_due`| DECIMAL(12,2)| | No | Principal scheduled portion |
| `interest_due` | DECIMAL(12,2)| | No | Interest scheduled portion |
| `principal_paid`| DECIMAL(12,2)| | No | Accumulated principal paid |
| `interest_paid`| DECIMAL(12,2)| | No | Accumulated interest paid |
| `penalty_due` | DECIMAL(12,2)| | No | Calculated penalty outstanding |
| `penalty_paid`| DECIMAL(12,2)| | No | Accumulated penalties paid |
| `status` | VARCHAR(20) | | No | Enum: Pending, Partial, Paid, Overdue, Waived |

---

### F. table: `payments`
Transactions representing collections.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique UUID |
| `loan_id` | VARCHAR(50) | FK | No | References `loans(id)` |
| `amount` | DECIMAL(12,2) | | No | Transaction amount |
| `receipt_no` | VARCHAR(30) | | No | Structured fiscal sequence (details below) |
| `payment_mode` | VARCHAR(20) | | No | Enum: Cash, Bank_Transfer, Check, Mobile_Money |
| `collected_by`| VARCHAR(50) | FK | No | References `users(id)` |
| `status` | VARCHAR(20) | | No | Enum: Active, Replaced, Reversed, Cancelled |

#### 🎫 Receipt Number Sequence Format
All transactions must map to a highly structured fiscal sequence:
* **Format**: `{BranchCode}-{YYYY}-{MMDD}-{Sequential4Digits}`
* **Example**: `CM001-2026-0630-0047`
* **Daily Reset**: The sequential 4-digit counter resets back to `0001` daily per physical operating branch. Counter sequences are fully audited to ensure zero gaps.
| `collected_at`| TIMESTAMP | | No | Payment date and time |

### G. table: `payment_allocations`
Allocation breakdown per transaction to schedules.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique UUID |
| `payment_id` | VARCHAR(50) | FK | No | References `payments(id)` |
| `schedule_id`| VARCHAR(50) | FK | No | References `loan_schedule(id)` |
| `amount` | DECIMAL(12,2) | | No | Portion allocated |
| `type` | VARCHAR(15) | | No | Enum: Penalty, Interest, Principal |

### H. table: `ledger_entries`
Double-entry general ledger records. Always balanced ($\sum \text{debits} = \sum \text{credits}$).

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique UUID |
| `payment_id` | VARCHAR(50) | FK | Yes | References `payments(id)` (if payment) |
| `loan_id` | VARCHAR(50) | FK | Yes | References `loans(id)` (if disburse/writeoff) |
| `account_code`| VARCHAR(20) | | No | Chart of Account reference (Index) |
| `debit` | DECIMAL(12,2) | | No | Debit portion |
| `credit` | DECIMAL(12,2) | | No | Credit portion |
| `posted_at` | TIMESTAMP | | No | Posting timestamp |

### I. table: `cash_books`
Daily end-of-shift cash drawer totals. Supports multiple operational sessions per calendar day.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique UUID |
| `branch_id` | VARCHAR(50) | FK | No | References `branches(id)` |
| `date` | DATE | | No | Calendar date of closing |
| `shift` | VARCHAR(20) | | No | Shift / Session identifier (e.g. `MORNING`, `EVENING`) |
| `closed_by` | VARCHAR(50) | FK | No | References `users(id)` |
| `verified_by` | VARCHAR(50) | FK | Yes | References `users(id)` (Manager) |
| `opening_cash` | DECIMAL(12,2) | | No | Opening cash balance |
| `collections` | DECIMAL(12,2) | | No | Sum of cash collections |
| `disbursals` | DECIMAL(12,2) | | No | Sum of cash disbursements |
| `expenses` | DECIMAL(12,2) | | No | Out-of-pocket operational costs |
| `actual_cash` | DECIMAL(12,2) | | No | Counted cash in drawer |
| `variance` | DECIMAL(12,2) | | No | Counted Cash - Expected Cash |
| `status` | VARCHAR(20) | | No | Enum: Submitted, Verified |

---

### J. table: `collaterals`
Asset backing ledger mapping physical security records to loans.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique UUID |
| `customer_id` | VARCHAR(50) | FK | No | References `customers(id)` (Index) |
| `loan_id` | VARCHAR(50) | FK | Yes | References `loans(id)` (Index, if linked to active loan) |
| `asset_type` | VARCHAR(50) | | No | e.g. Gold, Vehicle, Land, Personal_Guarantee |
| `description` | TEXT | | No | Asset make, model, serials, and condition reports |
| `valuation` | DECIMAL(12,2) | | No | Evaluated market value of asset |
| `status` | VARCHAR(20) | | No | Enum: Deposited, Released, Liquidated, Under_Review |
| `created_at` | TIMESTAMP | | No | Default current_timestamp |

---

### K. table: `loan_documents`
Digital document metadata registry for loan files and KYC compliance.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique UUID |
| `customer_id` | VARCHAR(50) | FK | No | References `customers(id)` (Index) |
| `loan_id` | VARCHAR(50) | FK | Yes | References `loans(id)` (Index, if linked to a loan) |
| `doc_type` | VARCHAR(50) | | No | e.g. National_ID_Copy, PAN_Copy, Address_Proof, Income_Statement |
| `file_name` | VARCHAR(255) | | No | Original upload file name |
| `storage_path` | VARCHAR(500) | | No | Cloud storage blob path reference |
| `uploaded_by` | VARCHAR(50) | FK | No | References `users(id)` |
| `uploaded_at` | TIMESTAMP | | No | Default current_timestamp |

---

### L. table: `guarantors`
Details of third-party guarantors co-signing loans to fulfill Microfinance credit security mandates.

| Field Name | Type | Key | Nullable | Description / Constraints |
| :--- | :--- | :---: | :---: | :--- |
| `id` | VARCHAR(50) | PK | No | Unique UUID (e.g. `guar-timestamp`) |
| `name` | VARCHAR(100) | | No | Legal name of co-signer |
| `national_id` | VARCHAR(50) | | No | National ID / Aadhaar of co-signer |
| `address` | TEXT | | Yes | Residential address of co-signer |
| `mobile` | VARCHAR(20) | | No | Contact mobile number |
| `relationship` | VARCHAR(50) | | No | Enum: Spouse, Parent, Sibling, Relative, Business Partner, Employer, Friend |
| `signature` | TEXT | | No | SVG stroke coordinates (base64) or stylized text glyph |
| `loan_ids` | ARRAY (VARCHAR) | | No | List of linked loan IDs being co-signed |
| `company_id` | VARCHAR(50) | FK | No | references `companies(id)` |
| `branch_id` | VARCHAR(50) | FK | No | references `branches(id)` |
| `created_at` | TIMESTAMP | | No | Creation and enrollment timestamp |

