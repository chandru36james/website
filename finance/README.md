# VGot You Finance (VYFL) — Core Microfinance Platform

VGot You Finance (VYFL) is an enterprise-grade, secure, and fully responsive **Loan Management & Financial Ledger Platform** built for small finance companies, microfinance institutions (MFIs), credit unions, NBFCs, and community lenders. The platform manages borrowers, coordinates KYC checks, processes loan origination under strict pricing constraints, computes complex schedules, enforces Role-Based Access Controls (RBAC), and supports immutable financial ledger entries designed for double-entry accounting.

---

## 🚀 Key Features

- **Role-Based Access Control (RBAC)**: Fine-grained permissions for Super Admins, Managers, Loan Officers, Accountants, and Auditors.
- **Loan Origination**: Intuitive workflows for creating, reviewing, and approving loan applications.
- **Customer & KYC Management**: Unified profiles with secure ID masking (Aadhaar/PAN) and document verification.
- **Collateral Tracking**: Standardized tracking, description, and valuation of customer collaterals.
- **Configurable Business Rule Engine**: Centrally managed rules for credit scores, processing fees, and dynamic interest bands.
- **Multiple Interest Calculation Methods**: Support for Flat, Reducing Balance, Compound, and Simple interest schedules.
- **EMI & Amortization Engine**: Real-time dynamic amortization schedule generation and payment breakdowns.
- **Penalty & Waiver Management**: Automated late fee computations with controlled supervisor waiver overrides.
- **Cash Book & Daily Closing**: End-of-day balances, manual vault entry tracking, and system handovers.
- **Immutable Ledger Entries**: System locks to enforce immutable transaction records designed for double-entry accounting.
- **Immutable Audit Trail**: Every critical action, approval, and rule modification is permanently recorded with timestamps and user attribution.
- **Guarantor Module**: Dedicated co-signer management featuring residential verification, Aadhaar linking, secure digital signature execution (HTML5 drawing canvas), and multi-contract risk attribution.
- **Dashboard & Reports**: Real-time summary metrics, aging loan buckets, disbursement schedules, and collection analytics.
- **Multi-Branch Ready**: Flexible organizational structures for community lenders and regional branches.
- **Responsive UI**: High-fidelity modern interface built with React, Vite, Tailwind CSS, and Framer Motion.

---

## 📊 System Architecture

The software architecture is designed to enforce business logic boundaries and secure system state:

```text
       ┌────────────────────────┐
       │        Browser         │
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │   React Client (SPA)   │
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │        REST API        │
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │  RBAC & Authentication │
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │  Business Rule Engine  │
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │   Calculation Engine   │
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │     Ledger Engine      │
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │ Persistent Data Store  │
       └────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts & D3.js

### Backend & Database
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Primary) / Firebase Firestore (Optional / Sandbox Sync)
- **Authentication**: Firebase Authentication & Security Policies

---

## 📂 Project Structure

```text
src/
├── assets/             # Vector assets, icons, and logos
├── components/         # Modular user interface components & views
├── context/            # Global context providers (VFMSContext for core business state)
├── firebase/           # Database setup and connection rules
├── utils/              # Calculation helpers, amortization schedules, and math formulas
├── types.ts            # Global TypeScript interface definitions
├── main.tsx            # Application mounting entry point
└── App.tsx             # Main layout, activity lock listeners, and tab routing
```

---

## 🔑 Default Gateway Access & Credentials

The platform is configured with a **strict clean-slate database initialization** policy for the sandbox. There is no pre-populated clutter, ensuring a fully accurate operational trial:

- **Institutional Gateway Login**:
  - **Email Address**: `admin@vfms.com`
  - **Secure Password**: `vgotyou2026`
- **Dynamic Role Simulation**:
  - Once authenticated as the Super Admin, locate the **RBAC Tester Switcher** in the top header.
  - Instantly simulate any other user tier (Manager, Loan Officer, Accountant, Auditor) to verify views, controls, forms, and permission constraints on-the-fly.
- **Sub-User Provisioning**:
  - Access the **User Management** panel as Super Admin to dynamically onboard real, persistent sub-user profiles with customized emails and role designations.
- **Audit Trail Logging**:
  - Authentication attempts with unauthorized email addresses or invalid passwords are blocked, and the transaction is permanently written to the secure `Audit Logs` trail.

---

## 📚 Technical & Operational Specifications

We have structured the product documentation and technical blueprints into a cohesive, ten-part modular specification set located inside the `/docs` directory. This ensures high readability, historical compliance tracking, and clean separation of business, structural, and operational rules.

Use the directory mapping below to access each specification:

| Module / Document | Purpose & Contents |
| :--- | :--- |
| [📂 01. Product Overview](./docs/01_Product_Overview.md) | Platform mission, core value proposition, and database-independent architecture supporting Sandbox Mode (Local Storage) and Configurable Production Databases (PostgreSQL / Firebase Firestore). |
| [📊 02. Business Rules & Financial Policy](./docs/02_Business_Rules.md) | Enforced pricing bands, limits, interest payment frequencies, and standard Non-Performing Asset (NPA) aging tiers. |
| [🔐 03. Role-Based Access Control (RBAC)](./docs/03_RBAC.md) | Security privileges for Super Admin, Manager, Loan Officer, Accountant, and Auditor roles, alongside token/session rules. |
| [🗄️ 04. Database Design](./docs/04_Database_Design.md) | Entity Relationship (ER) diagram, database schemas, field definitions, indices, and foreign key relationships. |
| [🌐 05. REST API Standards](./docs/05_API_Specification.md) | Standard URL routing structure, JSON payloads, and standardized HTTP status/error code mapping. |
| [📐 06. Financial Calculations & Ledger Engine](./docs/06_Finance_Engine.md) | Amortization formulas (Flat, Reducing, Compound, Simple), dynamic penalties, immutable rule snapshots, and early settlement options. |
| [🎨 07. UI Standards & State Management](./docs/07_UI_Standards.md) | Typography guidelines, layout responsive structure, state-hooks rules, and optimistic rendering strategies. |
| [🔄 08. Operational Workflows & Controls](./docs/08_Workflows.md) | Customer onboarding, immutable transaction reversal policies, receipt cancellation rules, and write-off sequences. |
| [🏗️ 09. Deployment & Backup Strategies](./docs/09_Deployment.md) | Cloud Run port specifications, daily database backup schedules, data retention parameters, and disaster recovery RPO/RTO metrics. |
| [🛠️ 10. Developer Guide](./docs/10_Developer_Guide.md) | Quick local environment setup steps, code quality standard rules, testing checklists, and linter usage. |

---

## 🛡️ Application Security & Integrity Controls

To defend high-security financial information from casual tampering, client-side manipulation, and unauthorized inspection, the platform includes a dynamic, configurable **Application Security & Integrity Controls** framework:

- **UI Hardening**: Intercepts and suppresses standard right-clicks across the terminal application, preventing casual browser inspect element selections and simple DOM selections.
- **Developer Tools Detection**: Monitors common developer tool shortcuts (`F12`, `Ctrl+Shift+I`, `Ctrl+Shift+J`, `Ctrl+Shift+C`) and view-source overrides (`Ctrl+U`), responding by warning the user, locking the active session, or recording an audit event.
- **Client-Side Obfuscation & Masking**: Conceals critical raw customer records (including Aadhaar, PAN, phone, and email) on lists and detailed drawers until temporarily decrypted.
- **Two-Factor Decryption Checks**: Supervisor authorization and passcode verification are required to temporarily reveal records, with all decryption actions permanently written to the audit log.
- **Server-Side Authorization**: Ensures that all critical transaction, pricing, and ledger entries are authorized and validated on the backend. True system security resides in backend validation, with client-side restrictions acting as supplementary visual defense.

---

## 🗺️ Roadmap

### Version 1 (Completed Core)
- [x] **Loan Management**: Core origination, pricing bands, and dynamic EMI schedule generation.
- [x] **Ledger**: Secure entries designed for immutable double-entry bookkeeping.
- [x] **Cash Book**: Daily vault and closing cash logs.
- [x] **Reports**: Branch-wide collections, active loan books, and NPA aging charts.

### Version 2 (Completed and Planned Upgrades)
- [x] **Digital Signature**: Real-time canvas drawing and keyboard digital signature execution for Guarantors & Co-signers.
- [x] **Live Camera KYC Document Vault**: Built-in camera viewfinder capturing, 90° orientation rotation, client-side auto-compression (<500KB JPEGs), and browser GPS geotagging.
- [ ] **Loan Product Templates**: Create reusable loan templates with predefined interest rates, penalties, processing fees, durations, and document checklists.
- [ ] **SMS Integration**: Automated transaction and EMI reminders.
- [ ] **WhatsApp Notifications**: Digital loan receipt delivery.
- [ ] **Mobile App**: Field agent portal for collections.
- [ ] **Multi-language**: Localized regional Indian dialect support.
- [ ] **OCR KYC**: Automated ID proof reading and verification.

---

## 🌐 Future Integrations

- WhatsApp Business API
- SMS Gateway API
- Popular Regional Payment Gateways (UPI/NetBanking)
- Email Notification Engine
- Digital Signature & eSign providers
- Aadhaar eKYC Gateway
- OCR Document Scanner & Verification Services
- Barcode & QR receipt generation

---

## ⚡ Quick Start Command Cheat Sheet

### 1. Dev Server Startup
Mount dependencies and boot the local dev server on port `3000`:
```bash
npm install
npm run dev
```

### 2. Verify Code Standard & Types
Prior to pushing commits, run the strict compiler and styling check:
```bash
npm run lint
```

### 3. Production Compilation
Build optimized client-side assets and bundle the server:
```bash
npm run build
```
The application will be compiled into the `/dist` directory, ready for immediate production deployment.

### 4. Local Database Emulator (On-premises Server Mode)
If deploying locally offline as an office server, boot the database emulators:
```bash
firebase emulators:start --import=./local_db --export-on-exit=./local_db --host 0.0.0.0
```

---

## 📈 Project Status

| Metric | Status |
| :--- | :--- |
| **Current Version** | v1.0 |
| **Status** | Under Active Development |

---

## 📄 License

This software and its documentation are proprietary to VGot You.

No part of this project may be copied, modified, redistributed, reverse engineered, or used for commercial purposes without prior written permission from VGot You.
