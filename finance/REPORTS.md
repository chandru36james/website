# Reports Center Module Documentation

The **Reports Center** serves as the consolidated analytics and ledger workspace for VGot You Finance. It provides real-time, print-ready, tabular accounting balance sheets and audit trail reports.

## 1. Directory Structure & Key Files
- **Main View**: [ReportsView.tsx](file:///c:/Users/DELL/Downloads/erp/finance/src/components/ReportsView.tsx)
- **Data Source Context**: [VFMSContext.tsx](file:///c:/Users/DELL/Downloads/erp/finance/src/context/VFMSContext.tsx)
- **Icons**: `lucide-react` (Calendar, Printer, BarChart3, FileText, etc.)

---

## 2. Integrated Sub-Reports
The Reports Center is divided into four operational quadrants:

### A. Collections Ledger
- **Description**: Consolidated daily cash and electronic repayment receipts logged by field agents.
- **Parameters**: Filterable by custom Date Range and quick Presets.
- **Aggregations**: Computes "Total Period Collections" dynamically.
- **Fields**: Receipt Code, Customer Contract, Payment Date, Payment Method (Cash, RTGS, UPI), Principal Portion, Interest Portion, and Gross Amount.

### B. Lending Portfolio Balance Sheet
- **Description**: Gross risk analysis of active and overdue credit contracts.
- **Parameters**: Displays outstanding principals currently active in the field.
- **Aggregations**: Computes "Consolidated Risk Outstanding" portfolio size.
- **Fields**: Contract Code, Customer Profile, Start Date, Classification (Daily, Weekly, Monthly), Gross Principal, Duration Term, and Portfolio Risk Status.

### C. Historical Cash Books Audit
- **Description**: Daily cash desk closing audit sheets sealed by managers at the end of each day.
- **Aggregations**: Displays vault opening cash, collections, field expense claim payouts, bank deposits, and ending cash balances.
- **Audit Verification**: Displays Audit Variance tallies showing discrepancies.

### D. System Audit Trail Logs (Super Admin & Auditor Only)
- **Description**: Chronological operational footprints showing who did what, when, and why.
- **Fields**: Audit timestamp, System module, Operator name, Operator role, and Narrative action details.

---

## 3. Date Presets & Custom Filters
Managers can filter records dynamically using the period toolbar:
- **Custom Pickers**: Select custom `From` and `To` dates.
- **Today**: Filters logs for today's date.
- **Weekly**: Filters logs for the trailing 7 periods.
- **Monthly**: Filters logs starting from the 1st of the current calendar month.
- **Clear Filters**: Resets filters to display all historical datasets.

---

## 4. Role-Based Access Control (RBAC) Clearance
Clearance parameters define which operators can pull specific reports:
| Role | Collections | Outstanding | Cash Books | Audit Logs |
| :--- | :---: | :---: | :---: | :---: |
| **Super Admin** | ✅ | ✅ | ✅ | ✅ |
| **Auditor** | ✅ | ✅ | ✅ | ✅ |
| **Manager** | ✅ | ✅ | ✅ | ❌ |
| **Accountant** | ✅ | ✅ | ✅ | ❌ |
| **Loan Officer** | ❌ | ❌ | ❌ | ❌ |

---

## 5. Printing Configuration
The Reports Center uses utility CSS sheets to format documents for print outputs:
- **Print Action**: Clicking the `Print Sheet Ledger` button triggers the system print manager (`window.print()`).
- **Styles**: Automatically hides sidebar navigations, header status controls, date filter pickers, and preset buttons, outputting only the clean, full-width tabular balance sheet.
