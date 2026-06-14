# VGOT Digital Experiences - Enterprise CMS & Operations Hub

A mission-critical, high-security Content Management System (CMS) and Business Intelligence platform built for VGOT Digital Experiences. This application integrates granular security protocols, real-time automation, and sophisticated data isolation to provide a production-ready environment for content, leads, and SEO intelligence.

---

## 🔒 Security Architecture (Zero-Trust Model)

The application implements a multi-layer security strategy to ensure total data isolation and protection against common web vulnerabilities.

### 1. Data Isolation & Access Control
- **RBAC (Role-Based Access Control)**: Enforced via Firebase Auth & Firestore Rules for three distinct roles:
  - **Admin**: Complete system control, user management, and global resource access.
  - **Editor**: Create and manage assigned pages and tools. Strictly limited to their own content.
  - **Viewer**: Read-only access to specific dashboards and reports. Cannot modify any production data.
- **Email Verification**: Write operations require a verified email token (per Firestore Rules).
- **Hardened Rules**: Firestore rules block unauthorized cross-user reads and "Ghost Field" injections using strict schema validation and `affectedKeys()` gating.

### 2. Content & Code Security
- **Sanitized Rendering**: All user-generated content (blog posts, custom headers) is passed through **DOMPurify** before rendering to strip script injections and XSS vectors.
- **Sandboxed Execution**: Custom HTML/CSS code in the Page Editor is rendered within a **Sandboxed Iframe** (`iframe sandbox="allow-scripts allow-forms"`). This isolates the main CMS state from potential third-party script vulnerabilities.
- **CSP Friendly**: External assets and scripts are only loaded from whitelisted CDNs defined in the sanitzation protocol.

---

## 🚀 Key Modules

### 🏗️ Content Manager
- **Visual & Code Mode**: Toggle between a section-based visual editor and a raw HTML/CSS/JS IDE.
- **Real-Time Preview**: Powered by a sandboxed iframe that reflects changes instantly without reloading the CMS.
- **Metadata Vault**: Integrated SEO tools ensure every page has valid OpenGraph, meta titles, and canonical tags.

### ⚡ Operations Hub (Tools)
- **SEO Audit Engine**: Technical performance analysis with actionable insights on core web vitals and metadata.
- **PDF Core System**: Enterprise-grade reporting engine that generates high-fidelity audits and lead summaries.
- **Outreach Hub**: Automated lead communication platform (Sequence-based engagement).
- **Migration Suite**: Architecture import engine for syncing legacy hardcoded sites into the CMS dynamic structure.

### 💼 CRM Intelligence
- **Lead Capture & Processing**: Real-time leads capture from public forms with automated owner assignment.
- **Audit Logs**: Comprehensive tracking of every action (Logins, Edits, Deletes, Publishes) for compliance and accountability.

---

## 🛠 Tech Stack & Utilities

- **Core**: React 18 (Vite), TypeScript 5, Tailwind CSS
- **Database**: Firestore (Enterprise Edition)
- **Security**: Firebase Auth, DOMPurify (@types/dompurify)
- **Animations**: Motion (framer-motion) for high-end UI transitions
- **Reporting**: jsPDF (Report Generation), PapaParse (Data Portability)
- **Icons**: Lucide React (using consistent icon sets from `@components/ui/Icons`)

---

## 📂 System Registry

```text
/src
 ├── pages/admin/    # Operations Hub, Content Manager, PDF Gen, SEO Audit
 ├── pages/public/   # Sanitized Dynamic Rendering & Public Frontend
 ├── lib/            # Firebase Config, Audit Logger, Security Utils
 ├── hooks/          # useAuth (RBAC state), useCMS (State management)
 ├── utils/          # PDF Generator, SEO Scanner (Intelligence Layer)
 ├── types/          # Strict TypeScript Interface Definitions
```

---

## 🚦 Administration Guide

### Initial Setup
1. **Bootstrap Admin**: Log in with `chandru36james@gmail.com` to gain primary system ownership.
2. **User Onboarding**: Use the **User Management** page to invite editors or viewers. Assign specific tools (SEO Audit, Leads) to grant permissions.
3. **Storage Security**: Files are capped at 5MB and restricted to specific image/pdf MIME types via Firebase Storage Rules.

### Maintenance & Safety
- **Linter**: Run `npm run lint` regularly. The system uses strict TypeScript checks to prevent runtime failures.
- **Rule Deployment**: If modifying `firestore.rules` or `storage.rules`, use the `deploy_firebase` tool to push updates to the cloud.

---
*Built with Security & Performance for VGOT Digital Experiences.*
