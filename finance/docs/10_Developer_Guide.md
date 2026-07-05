# 10. Developer Guide & Technical Setup Instructions

This guide provides instructions for developers onboarding onto the VGot You Finance codebase.

---

## 🛠️ 1. Quick Local Environment Setup

Ensure you have Node.js 18+ and npm installed on your system.

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```
2. **Environment File Configuration**:
   * Create a `.env` file in the root directory. Use `.env.example` as a template:
     ```env
     # .env
     PORT=3000
     DISABLE_HMR=true
     # Add Firestore config details if running production mode
     ```
3. **Boot Development Server**:
   ```bash
   npm run dev
   ```
   * Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 2. Gateway Authentication & Role Simulation

The platform initializes with a **fully clean database state** to prevent data clutter and ensure realistic sandbox trials. To access the system locally:

1. **Root Super Admin Credentials**:
   * **Email**: `admin@vfms.com`
   * **Password**: `vgotyou2026`
2. **Testing Role Permissions**:
   * Log in using the credentials above.
   * Locate the **RBAC Tester Switcher** in the top navigation bar.
   * Select any operational role (e.g., *Loan Officer* or *Accountant*) from the dropdown to immediately toggle UI/UX permissions on-the-fly.
3. **Provisioning Real Accounts**:
   * Access the **User Management** view from the sidebar as Super Admin.
   * Add new individual sub-user profiles with their respective role classifications for complete workspace onboarding tests.
4. **Audit Trail Compliance**:
   * Standard and failed login attempts are written directly to the `Audit Logs` panel. Try logging in with incorrect credentials to verify that terminal warnings and logs trigger correctly.

---

## 📜 3. Code Quality & Formatting Rules

The codebase enforces strict compiler flags and stylistic standards to prevent runtime errors:

* **Strict Type Checking**:
  * Developers must run the linter before submitting commits:
    ```bash
    npm run lint
    ```
    This triggers `tsc --noEmit` and validates that there are no implicit `any` assignments, unmapped import statements, or broken JSX selectors.
* **No Inline Styles**:
  * All layout and colors must be composed using **Tailwind CSS Utility Classes**.
* **Lucide Icon Mapping**:
  * All icons must be imported from `lucide-react`. Do not declare inline SVG blocks unless importing external vector brand logos.

---

## 🧪 4. Testing & Verification Guide

Prior to pushing code changes, developers should verify functionality against the following checkpoints:

1. **Role Access Testing**:
   * Switch roles using the **RBAC Tester Dropdown** in the top navigation.
   * Verify that the UI restricts menu links and forms based on the [03. Role-Based Access Control (RBAC) Specification](./03_RBAC.md).
2. **Amortization Accuracy**:
   * Enter a sample $10,000$ loan with Reducing Balance interest.
   * Run calculations and verify that the cumulative principal repaid equals exactly the disbursed principal.
3. **Database Mode Integrity**:
   * Test basic data creation in Local Sandbox.
   * Enable "Cloud Database Mode" and verify that auth flows and document writes settle cleanly on the active database collections.
