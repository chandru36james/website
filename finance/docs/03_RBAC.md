# 03. Role-Based Access Control (RBAC) & Authentication

VGot You Finance utilizes a multi-tiered security model to guarantee data confidentiality, compartmentalize high-risk administrative workflows, and protect transactional ledger records.

---

## 🔐 1. System Roles Matrix

Each user profile is assigned exactly one role. If a user is not logged in or doesn't have an active profile, they are restricted to the Authentication Gateway.

```
                  ┌─────────────────────────────────┐
                  │     Authentication Gateway      │
                  └────────────────┬────────────────┘
                                   │
                   [Authenticated User Profiles]
                                   │
         ┌───────────────┬─────────┼─────────┬──────────────┐
         ▼               ▼         ▼         ▼              ▼
   [Super Admin]     [Manager] [Loan Officer] [Accountant] [Auditor]
```

### Role Summary Descriptions

1. **Super Admin**: Controls global system behavior, interest rate bands, branch directory allocations, user profile roles, and operational rules versions.
2. **Manager**: Functions as the operational supervisor for a given branch. Approves loan applications, reviews risk profiles, overrides overdue penalties, waives installments, and authorizes settlement write-offs.
3. **Loan Officer**: Operates in the field. Onboards customers, inspects collateral assets, registers loan applications, and collects payments.
4. **Accountant**: Manages liquidity. Records ledger entries, maintains the daily cash book, registers expenses, and submits physical-to-digital cash reconciliations.
5. **Auditor**: Independent oversight role. Granted read-only permission across all dashboards, ledgers, customer documents, reports, and system-wide security audit logs.

---

## 🛠️ 2. Dynamic RBAC Tester Switcher
To facilitate development, testing, and compliance verification, the application includes a **Dynamic RBAC Tester Dropdown** in the header.
* **Super Admin Override**: If the logged-in user is originally a Super Admin, they can switch their active operating role on-the-fly to test the view permissions, forms, and restrictions of other roles (e.g. simulating a Loan Officer to test customer creation, or an Accountant to test cash book closing).
* **Access Restrict**: Standard users (e.g. a Loan Officer, Accountant, or Auditor) cannot see or use this switcher. Their active role is statically locked to their database profile.

---

## 🔒 3. Session Security & Token Policy
* **Identity Provider**: Production mode integrates with Firebase Authentication (Email/Password or Google OAuth).
* **Token Lifetime**: Auth tokens expire after 1 hour, triggering silent refreshing.
* **Session Termination**: Logging out clears all local storage context, tokens, active role overrides, and forces redirect to the Authentication Gateway.

---

## 🔑 4. Default Gateway Authentication & Provisioning
* **Secure Sandbox Entry**: In sandbox/local storage mode, access is strictly protected. Authentication requires logging in as the root Super Admin:
  * **Email**: `admin@vfms.com`
  * **Password**: `vgotyou2026`
* **Sub-User Onboarding**: Once logged in, the Super Admin can dynamically provision unique accounts for additional roles (Managers, Loan Officers, Accountants, and Auditors) via the **User Management Dashboard**.
* **Audit Trail Tracking**: Any unauthorized email or failed credential sign-in attempt at the login terminal is instantly logged as `FAILED_LOGIN_ATTEMPT` with the source IP/terminal identifier and timestamp in the system's tamper-proof audit trail.

