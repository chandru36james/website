# VGot You Finance — System Workflow Manual

This document provides a comprehensive guide to the role-based workflows, permissions matrix, and transaction lifecycles in the **VGot You Finance Management System (VFMS)**.

---

## 👥 Role Permissions Matrix

| Feature Module | Super Admin | Manager | Auditor | Loan Officer (Agent) |
| :--- | :---: | :---: | :---: | :---: |
| **Dashboard View** | ✅ Full | ✅ Full | 👁 Read-Only | 📱 Mobile Portal |
| **Reports Centre** | ✅ Full | ✅ Full | 👁 Read-Only | ❌ Restricted |
| **Customers Directory** | ✅ Edit / Delete | ✅ Edit / Delete | 👁 Read-Only | 📱 My Customers Only |
| **Loans Ledger** | ✅ Full | ✅ Full | 👁 Read-Only | 📱 Request Only |
| **Loan Approvals** | ✅ Approve/Disburse | ✅ Approve/Disburse | 👁 Read-Only | ❌ Restricted |
| **Daily Collections** | ✅ Full | ✅ Full | 👁 Read-Only | 📱 Log Payments |
| **Expenses Log** | ✅ Approve Claims | ✅ Approve Claims | 👁 Read-Only | 📱 Claim Logging |
| **Expense Categories** | ✅ Manage | ✅ Manage | ❌ Restricted | ❌ Restricted |
| **Cash Closing** | ✅ Authorize | ✅ Authorize | 👁 Read-Only | 📱 Submit closing |
| **Control Settings** | ✅ Full | 🔑 PIN Change Only | 👁 Logs Only | ❌ Restricted |
| **Approval PIN** | 🔑 Owns & Uses | 🔑 Owns & Uses | ❌ None | ❌ None |

---

## ⚙️ Interactive System Workflows

```mermaid
flowchart TD
    %% Styling Classes
    classDef admin fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff;
    classDef manager fill:#f59e0b,stroke:#d97706,stroke-width:2px,color:#fff;
    classDef agent fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff;
    classDef system fill:#10b981,stroke:#059669,stroke-width:2px,color:#fff;
    
    %% Start Authentication Node
    Start([User Logs In]) --> AuthRoute{Check Role}
    
    %% Auth Routing
    AuthRoute -->|Loan Officer| AgentPortal[Enter Agent Portal]
    AuthRoute -->|Super Admin / Manager| PinCheck{PIN Configured?}
    
    %% PIN Setup Route
    PinCheck -->|No| SetupPin[Force PIN Setup Modal]
    SetupPin -->|Configure Strong PIN| SavePin[Bcrypt Hashed & Saved]
    SavePin --> AdminWorkspace[Enter Control Workspace]
    PinCheck -->|Yes| AdminWorkspace
    
    %% Loan Officer Workflow
    subgraph Agent Portal Workflows
        AgentPortal --> LogCustomer[1. Register KYC Customer]
        AgentPortal --> RequestLoan[2. Request Loan]
        AgentPortal --> LogCollection[3. Collect Repayment]
        AgentPortal --> ClaimExpense[4. Log Expense Claim]
        AgentPortal --> CashClosing[5. Submit EOD Reconciled Cash]
    end
    
    %% Loan Workflow Routing
    RequestLoan -->|Status: Pending| LoanApprovalsView
    
    %% Admin Workflow
    subgraph Administrative Workspace Workflows
        AdminWorkspace --> LoanApprovalsView{Loan Approvals Center}
        AdminWorkspace --> SettingsView[Control Settings]
        AdminWorkspace --> ExpCat[Manage Expense Categories]
    end
    
    %% Loan Decision Routing
    LoanApprovalsView -->|Approved| AwaitingDisb[Status: Awaiting Disbursement]
    LoanApprovalsView -->|Rejected| RejectedLoan[Status: Rejected]
    AwaitingDisb -->|Manager Disburses| Disbursed[Disbursed & Repayment Schedule Activated]
    
    %% Action PIN Guards
    subgraph Manager PIN Authorization Guards
        DeleteCust[Delete Customer] --> PinAuth{PIN Validation}
        WaivePenalty[Waive Penalty] --> PinAuth
        AuthClosing[Submit Cash Closing] --> PinAuth
    end
    
    %% Trigger guards
    LogCustomer -->|If Deleting| DeleteCust
    LogCollection -->|If Waiving Penalty| WaivePenalty
    CashClosing --> AuthClosing
    
    %% PIN Verification Routing
    PinAuth -->|Agent Action| AskManager[Trigger Manager Approval Required Modal]
    PinAuth -->|Admin Action| CheckSession{Active Approval Session?}
    CheckSession -->|Yes| ConfirmAction[Execute Action]
    CheckSession -->|No| InputPin[Enter Approval PIN]
    AskManager -->|Supervisor Enters PIN| InputPin
    
    InputPin --> VerifyBcrypt{Verify Hashed PIN}
    VerifyBcrypt -->|Success| SetSession[Cache 3-Min Approval Session]
    SetSession --> ConfirmAction
    VerifyBcrypt -->|Fail| LogFailed[Log Failed Attempt & Increment Count]
    LogFailed -->|Attempts >= 5| Lockout[Lock Approver Account for 5 Minutes]
    
    class AdminWorkspace,SettingsView,ExpCat admin;
    class LoanApprovalsView,PinAuth,VerifyBcrypt manager;
    class AgentPortal,LogCustomer,RequestLoan,LogCollection,ClaimExpense,CashClosing agent;
    class SavePin,ConfirmAction,Lockout system;
```

---

## 🔑 Security & Authorization Flow (PIN Guard)

When a Loan Officer triggers a restricted action, the system intercepts the execution and requires a supervisor to authorize it:

### 1. Verification & Verification Session
1. **PIN Required on Actions**: If a restricted action is triggered (e.g., Deleting a customer, waiving daily collection penalties, or initiating cash closing):
   - If a **Super Admin** or **Manager** is logged in, they can authenticate using their own PIN.
   - If a **Loan Officer** is logged in, they are shown a **Manager Approval Required** dialog asking a nearby supervisor to input their PIN.
2. **Session Caching**: When a supervisor successfully enters their PIN, the system starts a **3-minute Approval Session** (duration configurable by Admin). During this time, consecutive actions can be performed without re-entering the PIN.

### 2. Lockout and Security Auditing
- **Brute-Force Lockout**: PIN attempts are validated using secure `bcryptjs` hashing. If an approver account accumulates **5 failed PIN attempts**, that specific account is locked for **5 minutes** (locked until timestamp stored persistently in Firestore).
- **Security Audit logs**: Successful and failed PIN attempts are logged to an immutable security audit database, recording:
  - Timestamp & Action
  - Approver Name & Role
  - Requesting Agent Name & Role
  - Device details, IP Address, and Browser User Agent

---

## 📈 Lending Lifecycle

```
[Agent] Register Customer Profile
       │
       ▼
[Agent] Submit Loan Request (Pending Approval)
       │
       ├─► [Manager/Admin] Reject Loan (Application Terminated)
       │
       ▼
[Manager/Admin] Approve Loan (Status: Approved - Awaiting Disbursement)
       │
       ▼
[Manager/Admin] Disburse Loan (Capital Released, Repayment Schedule Activated)
```

---

## 💰 End-of-Day (EOD) Cash Closing

At the end of each field route, Loan Officers must reconcile and close their cash books:

1. **Reconciliation**: Agent enters cash on hand and accounts for collected payments minus approved field expenses.
2. **Manager Approval**: The agent clicks **Close Cash**, which prompts for a Manager/Admin PIN.
3. **Closing Audit**: The manager enters their PIN, locking the agent's ledger entries for that day to prevent tampering or modification.
