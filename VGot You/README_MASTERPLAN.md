# VGOT Digital Experiences: The Master Blueprint

Welcome to the **VGOT Digital Experiences Master Manual**. This document serves as the definitive guide for users, developers, and architects. It details the "How," "Why," and "What" of this enterprise-grade CMS and Operations Hub.

---

## 1. 📖 User Manual: Operating the Platform

### Phase A: Authentication & Access
1.  **Entry**: Access the portal via `/admin/login`.
2.  **Identity**: Sign in using Google Authentication.
3.  **Roles**: 
    *   **Admins** see everything.
    *   **Editors** see their own content.
    *   **Viewers** see reports only.

### Phase B: Content Mastery (Managing the Website)
1.  **Content Manager**: Navigate to the **Content** tab. Here you manage **Pages**, **Blog Posts**, and **Media Assets**.
2.  **Visual Editing**: Click "Edit" on a page. Use the sidebar to change text, images, and brand colors.
3.  **Code Mode (Full Access)**: Toggle to "Full Access Mode" in the editor to modify raw JSON structures. This allows precision control over page JSON schemas.
4.  **Publishing**: Pages are saved as "Drafts" by default. Set status to "Published" to make them visible on the public URL.

### Phase C: Operations Hub (Tools & Utilities)
1.  **Leads**: Every form submission on your public site is captured in **Real-Time**. Tag leads, add notes, and track conversions.
2.  **PDF Generator**: 
    *   **Visual Mode**: Fill in fields (Client Name, Items, Services) manually.
    *   **Full Access Mode**: Paste a JSON object directly to generate complex documents with custom metadata, custom currency, and terms.
    *   **Integrate**: Click "Integrate & Sync" to verify your code before downloading the PDF.
3.  **SEO Audit**: Run a scan on any URL to receive a technical scorecard (Grades A-F) and optimization tips.

### Phase D: Growth & Engagement (Analytics & Referrals)
1.  **Dashboard Intelligence**: 
    *   **Page-Level Analytics**: See exactly which pages attract the most views and leads.
    *   **Conversion Optimization**: Track Lead Conversion Rates per page to identify high-performing funnels.
    *   **Global Insights**: Admins track platform-wide circulation and point economy health.
2.  **Points Economy 2.0**:
    *   **Daily Rewards**: Earn points simply by logging in once a day.
    *   **Activity Mining**: Page publishing and template creation award points automatically.
    *   **Referral Engine**: Share your unique ID to earn massive bonuses when new freelancers join.
3.  **Smart Notifications**: 
    *   Receive real-time alerts for New Leads, Points Earned, and Storage Thresholds.
    *   **Upgrade Suggestions**: AI-driven alerts trigger when your account approaches usage limits.

### Phase E: Technical Documentation & PDFs
1.  **PDF Suite**:
    *   **Client Database**: Save recurring clients to the database and use "Auto-Fill" to snap their details into your documents instantly.
    *   **Shareable Links**: Generate a "Live Link" for any document. Clients view your proposal on a sleek, high-precision web portal instead of just downloading a file.
    *   **Design Archiving**: Save any PDF design as a reusable "Design Pattern" for future consistency.

---

## 2. 🗺️ Functional Flow Charts (Logic Maps)

### A. The Page Publishing Flow
```text
[User Edits Page] -> [Live Preview (Sanitized Iframe)] 
       |
[Click Save] -> [Sanitize Input (DOMPurify)]
       |
[FireStore Update] -> [Security Rule Check: isOwner()?]
       |
[Public Site View] -> [Dynamic Route Match] -> [Sanitized Render]
```

### B. The Lead Capture Flow
```text
[Public Visitor Fills Form] -> [Frontend Validation]
       |
[Submit to /leads] -> [Security Rule: Public Create Allowed]
       |
[Real-Time Trigger] -> [Admin Dashboard Update (Haptic/Visual)]
       |
[Admin Actions] -> [Update Status / Assign Tag]
```

### C. Precision PDF Architecture (The Logic We Built)
```text
[Editor: Visual/Code] -> [State Sync: PDFContent Object]
       |
[Click Integrate] -> [Validation: Ensure items=array] -> [Normalization: Price/Qty]
       |
[Generate PDF] -> [jsPDF Engine] -> [Draw Header (Primary Color)]
       |
[Save File] -> [Filename: Reference No / Title]
```

### D. Real-Time Notification Pipeline
```text
[System Event] -> [Firestore Write: notifications/{id}]
       |
[AdminLayout] -> [onSnapshot Listener]
       |
[NotificationToaster] -> [Trigger AnimatePresence Toast]
       |
[Sidebar Badge] -> [Async Count Computation]
```

### E. Referral Reward Engine
```text
[Visitor B Sign-up] -> [Check URL Param: ?ref=UserID_A]
       |
[Create User Profile] -> [Atomic Transaction: Create Referral Doc]
       |
[Balance Update] -> [Increment: User_A.totalPointsEarned (+50)]
       |
[Notify User_A] -> [Trigger "Reward" Notification Type]
```

---

## 3. 🏗️ High-Level Project Structure

To recreate this project, follow this directory blueprint:

```text
/src
 ├── pages/
 │    ├── admin/          # The Protected Dashboard & Tools
 │    │    ├── Dashboard.tsx      # Stats & Real-time feed
 │    │    ├── ContentManager.tsx # Pages/Posts list
 │    │    ├── PDFGenerator.tsx   # Precision PDF Engine
 │    │    └── SEOAudit.tsx       # Intelligence Tools
 │    └── public/         # The Live Website Rendering
 │         ├── DynamicPage.tsx    # Sanitized Page Renderer
 │         └── BlogPost.tsx       # Sanitized Article View
 ├── components/
 │    ├── layout/         # Admin Sidebar & Nav
 │    └── ui/             # Branded UI components (Buttons, Inputs)
 ├── lib/
 │    ├── firebase.ts     # Core SDK Init
 │    └── logger.ts       # Audit Logging System
 ├── utils/
 │    ├── pdfGenerator.ts # PDF Logic (jsPDF integration)
 │    └── scanner.ts      # SEO logic
 └── types/
      └── index.ts        # Global TS Interfaces
```

---

## 🏗️ How to Recreate This Project

If you were to start from scratch, follow these 5 steps:

### 1. The Foundation (Vite + React)
*   **Setup**: Use Vite with TypeScript.
*   **Styling**: Install Tailwind CSS. Configure `tailwind.config.js` to handle your custom brand colors.
*   **Icons**: Standardize on `lucide-react`.

### 2. The Persistence Layer (Firebase)
*   **Firestore**: Set up collections for `users`, `pages`, `posts`, `leads`, `logs`, and `pdf_templates`.
*   **Rules**: Implement "The Eight Pillars" of security rules (Auth checks, Schema validation, Identity Gating).
*   **Auth**: Enable Google Login.

### 3. The Security Core (Sanitization)
*   **Crucial**: Install `dompurify`.
*   **Rule**: Never use `dangerouslySetInnerHTML` without passing the content through `DOMPurify.sanitize()`.
*   **Iframe**: Use sandboxed iframes for page previews to prevent scripts from leaking into the admin app.

### 4. The Intelligence Layer (Utilities)
*   **PDF**: Use `jsPDF` and `jspdf-autotable`. Create a central `pdfGenerator.ts` that takes a `style` and `content` object.
*   **Reporting**: Use `recharts` for the dashboard analytics.

### 5. Deployment
*   **Environment**: Store API keys in `.env`. Prefix with `VITE_` for client access.
*   **Build**: Ensure `npm run build` generates a clean `dist` folder.

---

## 🔐 Database Blueprint (Firestore)

| Collection | Role | Key Fields |
| :--- | :--- | :--- |
| `users` | User Profiles | `role`, `points`, `email`, `emailVerified` |
| `pages` | Website Content | `title`, `slug`, `content`, `status`, `ownerId` |
| `leads` | Customer Data | `name`, `email`, `status`, `sourcePage` |
| `logs` | Audit Trail | `action`, `timestamp`, `userId`, `details` |
| `pdf_documents`| Export History | `title`, `total`, `userId`, `items` |
| `pdf_templates`| Design Patterns | `title`, `styles`, `userId` |
| `pdf_shares` | Live Share Links | `content`, `style`, `ownerId`, `expiresAt` |
| `clients` | Client Directory | `name`, `email`, `company`, `ownerId` |
| `page_stats` | Page Analytics | `pageId`, `views`, `leads`, `lastUpdated` |

---
**VGOT Digital Experiences** is a modular, high-security ecosystem. By following this structure, you ensure that as your business grows, the architecture remains robust, secure, and easy to maintain.
