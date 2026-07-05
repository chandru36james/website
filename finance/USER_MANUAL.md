# VGot You Finance (VYFL) — Core User Manual & Operations Guide

Welcome to the official **VGot You Finance Management System (VFMS)** Operations Guide. This manual provides step-by-step instructions to navigate and operate the microfinance, loan origination, double-entry accounting ledger, and terminal security features of the platform.

---

## 📖 Table of Contents
1. [Platform Access & Authentication](#1-platform-access--authentication)
2. [Executive Dashboard & Telemetry](#2-executive-dashboard--telemetry)
3. [Borrower & KYC Management](#3-borrower--kyc-management)
4. [Guarantor Verification & Digital Signatures](#4-guarantor-verification--digital-signatures)
5. [Collateral Tracking Ledger](#5-collateral-tracking-ledger)
6. [Loan Origination, Underwriting & EMIs](#6-loan-origination-underwriting--emis)
7. [Cash Book & Daily Drawer Closing](#7-cash-book--daily-drawer-closing)
8. [Double-Entry General Ledger](#8-double-entry-general-ledger)
9. [Underwriting Rules & System Security Settings](#9-underwriting-rules--system-security-settings)
10. [Audit Trails & Portfolio Reports](#10-audit-trails--portfolio-reports)

---

## 1. Platform Access & Authentication

VFMS features institutional security protocols protecting borrower databases.

### 🔑 Signing In
1. Open the application on your authorized terminal.
2. Select your current database mode in the sidebar footer:
   * **Developer Sandbox**: Offline local database playground for training/demonstrations.
   * **Live Database**: Active cloud production database (connects directly to Google Firebase).
3. In the login screen, enter your credentials:
   * **Standard Root Admin Credentials**:
     * **Email**: `admin@vfms.com`
     * **Password**: `vgotyou2026`
4. Click **Sign In**.

### 🏢 Changing Branches & Roles
1. **Branch Switcher**: On the top header, click the branch name dropdown to switch your terminal context (e.g., *Main Head Office*, *City Center Branch*, *East Plaza Branch*). Data filters instantly refresh to display records scoped to the selected branch.
2. **RBAC Switcher**: Administrators can switch active user roles (*Super Admin*, *Manager*, *Loan Officer*, *Accountant*, *Auditor*) using the **RBAC Tester** button in the header to simulate permission structures.

---

## 2. Executive Dashboard & Telemetry

The Dashboard tab serves as the operational headquarters of the terminal.

### 📊 Understanding KPIs
* **Today's Cash in Hand (₹)**: Reflects the verified drawer closing cash from the latest approved Cash Book log.
* **Active Loan Portfolio (₹)**: Sum of all outstanding principal balances on disbursed, active, and overdue loans.
* **Collections Received (₹)**: Cumulative value of all receipts processed through the terminal, showing the interest portion separately.
* **Collaterals Held (₹)**: Estimated market value of all active collateral assets currently stored in physical vault locations.

### 📈 Amortization Trends & Status Mix
* **Lending Trends**: Interactive Area Chart tracking monthly principal disbursements vs. collections.
* **Status Distribution**: Pie Chart displaying the percentage breakdown of active, overdue, pending, and closed loans.

---

## 3. Borrower & KYC Management

The **Customers** tab manages borrower files and verification records.

### ➕ Registering a New Customer
1. Navigate to the **Customers** tab and click **"Register New Customer"** in the sub-navigation.
2. Complete the onboarding form:
   * Full Name, Email, Mobile Phone, and Physical Address.
   * Occupation, Annual Income, Aadhaar Number, PAN Card Number, and Nominee Contact details.
   * **Risk Category**: Select *Low*, *Medium*, or *High* based on baseline credit queries.
3. Click **"Register Customer Profile"**.

### 📄 Verifying KYC Documents
1. Select a customer from the registry list to view their profile.
2. Scroll to the **KYC Document Checklist** panel.
3. **Upload scanned files**: Click **"Upload"** on the target document row to browse and select files (PDF, PNG, JPG, WebP) from your device.
4. **Capture live camera photo**: Click **"Camera"** on the target document row to open the secure camera capture modal:
   * Select **"Switch Camera"** to toggle front/rear webcams (rear camera is recommended for high-quality document scanning).
   * Click **"Capture Specimen"** to snap a photo frame.
   * Review the image preview. Use the **Rotate** button to rotate the photo 90° clockwise if needed.
   * Click **"Save to Vault"** to run auto-compression (<500KB), log browser GPS coordinates (`geotag`), compute the SHA-256 integrity hash, and securely upload it.
5. Uploaded documents appear in the active list. Select any file to inspect status, verification remarks, or checksum logs.

---

## 4. Guarantor Verification & Digital Signatures

Guarantors act as co-signers to secure high-principal contract risk.

### ➕ Linking a Guarantor
1. Go to the **Guarantors** tab and click **"Add Guarantor Profile"**.
2. Complete the profile details: Name, Aadhaar/National ID, Address, Phone, and Relationship to the borrower.
3. In the **Contract Allocation** panel, select the loans this guarantor is co-signing.

### ✍️ Executing Digital Signatures
1. Under the guarantor form, scroll to the **Contract Signature Execution** pad.
2. Select your signature mode:
   * **Draw Signature**: Draw directly on the signature canvas using a stylus or mouse pointer. Click **"Clear Pad"** to redraw.
   * **Type Signature**: Type the guarantor's full name. The platform auto-generates a stylized digital script signature.
3. Click **"Save Guarantor Profile"** to cryptographically link the signature to the co-signed loan records.

---

## 5. Collateral Tracking Ledger

The **Collaterals** tab logs physical assets pledged to secure loan contracts.

### ➕ Depositing Vault Collateral
1. Go to the **Collaterals** tab and click **"Deposit Collateral Asset"**.
2. Select the linked **Customer & Loan Contract** from the dropdown menu.
3. Enter asset specifications:
   * **Asset Type**: Gold, Property, Vehicle, or Trust document.
   * **Estimated Market Value**: The verified valuation of the asset.
   * **Storage Location**: Specify the safe or vault ID where the asset is deposited.
4. The system calculates the **Loan-to-Value (LTV)** percentage to check if the collateral value covers the principal.
5. Click **"Register Vault Deposit"**.

### 🔄 Modifying Collateral Status
1. Select the asset from the list.
2. In the status dropdown, switch between **Deposited**, **Returned** (returned to borrower upon loan closure), or **Liquidated** (sold to recover overdue defaults).

---

## 6. Loan Origination, Underwriting & EMIs

The **Loans & EMIs** tab manages the entire lifecycle of credit contracts.

### ➕ Generating a New Loan Application
1. Go to the **Loans & EMIs** tab and click **"Create Loan Application"**.
2. Select the **Customer** from the dropdown.
3. Complete the contract parameters:
   * **Loan Type**: Select Personal, Business, or Asset backed.
   * **Principal Amount (₹)**: Enter the principal to be borrowed.
   * **Interest Type**: Flat, Reducing Balance, Simple, or Compound.
   * **Interest Rate (%) & Frequency**: Annual interest rate and calculation unit.
   * **Duration & Collection Frequency**: Repayment duration (Daily, Weekly, Monthly).
4. Review the **Live Calculation Amortization Preview** panel:
   * **Processing Fee (₹)**: Deducted immediately from principal.
   * **Net Disbursed Amount (₹)**: Actual amount handed over to the client.
   * **EMI Amount (₹)**: Scheduled installment dues.
5. Click **"Register Loan Contract"**.

### 🚦 Approval & Disbursement Workflow
1. **Pending Approval**: A loan officer registers the contract. A **Manager** or **Super Admin** selects the pending loan from the list and clicks **"Approve Application"** (or *Reject Application*).
2. **Disbursement**: Once approved, select the loan and click **"Process Disburse"**. This triggers the following double-entry ledger bookings:
   * Debit: Loan Portfolio Account
   * Credit: Vault Cash Account
   * Credit: Processing Fee Income Account
3. The loan status transitions to **Active**.

### 💵 Recording Collections & Repayments
1. Go to the **Loans & EMIs** tab and click **"Record EMI Payment"**.
2. Select the active **Loan Contract** and enter the **Collection Amount (₹)**.
3. Choose the **Payment Method** (Cash, UPI, Cheque, Bank Transfer, Card).
4. Enter the physical **Receipt Number** and click **"Post Repayment Ledger Entry"**.
5. The transaction engine allocates the payment according to the priority order configured in the Rule Engine (e.g., *Penalties → Interest due → Principal due*).

### 🛡️ Waivers & Write-offs
* **Waive Installment**: In the active loan details panel, select a specific overdue schedule line and click the **Waiver** icon. Enter the waive amount and supervisor justification.
* **Write-off Loan**: If a loan is uncollectible, select the contract and click **"Write-off Contract"**. Enter the reasoning. The outstanding balance is booked as bad debt.

---

## 7. Cash Book & Daily Drawer Closing

The **Cash Book** tab tracks physical drawer receipts and balances cash desks daily.

### 🚪 Daily desk drawer Closing Flow
1. At the end of the day, go to the **Cash Book** tab.
2. In the **Bookmaker Controls** panel, click **"Close Daily Cash Book"**.
3. The modal displays system-tallied collections and opening cash. Enter:
   * **Daily Expenses (₹)**: Any miscellaneous cash spent from the drawer.
   * **Bank Deposit Cash (₹)**: Any cash handed over to bank couriers.
   * **Actual Physical Cash in Drawer (₹)**: Count your drawer notes precisely and enter the value.
4. Review the **Calculated Variance**:
   * A variance of `0.00` indicates a **Balanced Tally**.
   * Positive/negative variances indicate cash surpluses/deficits.
5. Click **"Verify & Close desk drawer"**.

### 🔒 Manager Lock-in
1. The submitted entry appears in the cash list as **Pending Verification**.
2. A **Manager** or **Super Admin** reviews the variance and clicks **"Verify & Lock"** to seal the books. This locked closing cash becomes tomorrow's opening balance.

---

## 8. Double-Entry General Ledger

The **Double Entry Ledger** tab houses the audit-locked accounting books.

### 📖 Viewing & Searching Transaction Entries
* Every credit allocation, disbursement, fee payment, and write-off posts real-time balanced double entries (Debits/Credits).
* Use the search bar to filter ledger logs by description, loan contract reference, or amount.

### 📥 Exporting Financial Reports
1. In the ledger view, click **"Export Immutable Ledger (CSV)"**.
2. The browser downloads a ledger file named `VY_Immutable_Ledger_YYYY-MM-DD.csv`, ready for importing into institutional accounting packages.

---

## 9. Underwriting Rules & System Security Settings

Enforce business constants and workspace security rules from the **Rule Engine** and **User Access Control** panels.

### ⚙️ Rule Engine Parameters
1. Navigate to the **Rule Engine** tab (accessible by *Super Admin* only).
2. Configure active credit metrics:
   * **Interest Rate Range**: The baseline interest boundaries.
   * **Grace Period Days**: Days before late payments trigger penalties.
   * **Daily Penalty Rate (%)**: Charge per day on overdue principal.
   * **Processing Fee fixed / percent**: Fees deducted at loan booking.
   * **Contract Prefix**: Alphanumeric prefix for new contracts (e.g. `VY-LN-`).
3. Click **"Update Formulas Version"** to save changes.

### 🛡️ Access Control & PIN Configuration
1. Go to the **User Access Control** tab.
2. Toggle security flags:
   * **Action Verification PIN**: Prompts for a supervisor PIN before approving loans, waiving penalties, or changing rules.
   * **Anti-hacking Shields**: Block right-clicks and developer inspector panels.
3. **Change PIN**: Enter a new global supervisor authorization passcode in the PIN panel and save.

---

## 10. Audit Trails & Portfolio Reports

Monitor operational performance and staff compliance.

### 🧾 Security Audit Trail
* Navigate to the **Audit Trail** tab.
* The system logs every user log-in attempt, rule adjustment, loan approval, and settings change. Each entry records the module, the previous value, the new value, timestamp, and user attribution.

### 📊 Portfolio Aging Reports
* Navigate to the **Reports** tab.
* Access dashboards tracking:
  * **Disbursement Analytics**: Principal distributed within selected dates.
  * **Portfolio at Risk (PAR)**: Aging buckets showing loans overdue by *1-30 days*, *31-60 days*, *61-90 days*, and *90+ days*.
  * **Collection Metrics**: Desk collections sorted by staff ID.
