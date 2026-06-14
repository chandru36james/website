# VGOT Digital Experiences: Full SaaS Architecture Blueprint

This document represents the complete technical and logic circuit for the VGOT platform, covering all aspects from user acquisition to God-level administration.

## 1. The Gateway & Legal Protocol (Onboarding Flow)
```mermaid
graph TD
    Start[User Landing] --> Auth{Authenticated?}
    Auth -- No --> Login[Google Auth / Login Page]
    Auth -- Yes --> DataCheck{Profile Exists?}
    
    DataCheck -- No --> NewUser[Onboarding Module]
    NewUser --> Theme[Style/Template Selection]
    Theme --> AutoGen[AI Page Scaffolding]
    AutoGen --> Plan[Select Subscription Plan]
    Plan --> SaveUser[Initialize User in /users]
    
    DataCheck -- Yes --> TermsCheck{Accepted v1.0.0?}
    TermsCheck -- No --> Legal[Terms & Conditions Modal]
    Legal --> Consent[Store: IP, UA, Version, Timestamp]
    Consent --> WalletInit[Init PKT Balance]
    
    TermsCheck -- Yes --> Dashboard[Admin Dashboard]
```

## 2. Monetization & Growth Loop
```mermaid
graph TD
    subgraph "Billing Pipeline"
    User[Select Upgrade] --> Pay[Payment Gateway - Stripe/Simulated]
    Pay --> Success{Success?}
    Success -- Yes --> Upgrade[Update Profile: Plan = Business]
    Upgrade --> Unlock[Increase Storage: 20MB -> 1GB]
    Upgrade --> Feature[Unlock: PDF Generator & AI Writer]
    end
    
    subgraph "Referral Engine"
    Invite[Share Unique ID] --> Signup[New User Joins]
    Signup --> Reward[+1000 PKT to Referrer]
    Reward --> Bonus[+5MB Permanent Storage Bonus]
    Bonus --> Notify[Push Notification: 'Storage Expanded!']
    end
```

## 3. The Content & AI Synthesis Engine
```mermaid
graph LR
    User[User Input] --> AI{AI Generator}
    AI --> Logic[Gemini API: Content Synthesis]
    Logic --> Preview[Live Editor Preview]
    Preview --> Save[(Firestore: /pages)]
    
    subgraph "Real-time Synchronization"
    Save --> Listener[Dashboard Listener]
    Listener --> UI[Update Site Cards]
    end
    
    subgraph "Public Rendering"
    Slug[Public Slug] --> Reader[SSR / Client Fetch]
    Reader --> DOM[Safe Render via DOMPurify]
    DOM --> Analytics[Track: Page View]
    end
```

## 4. PKT Point Economy & PDF Suite
```mermaid
graph TD
    PDF[Request: Generate PDF] --> Bal{Check PKT Balance}
    Bal -- < 10 PKT --> Error[Insufficient Balance Alert]
    Bal -- >= 10 PKT --> Auth[Deduct 10 PKT]
    
    Auth --> Gen[Compute Layout & Branding]
    Gen --> Store[(Storage: document.pdf)]
    Store --> Link[Generate /pdf_shares Link]
    Link --> CRM[Attach to Lead/Client Record]
```

## 5. Security Architecture & Data Isolation
```mermaid
graph TD
    Req[Client Request] --> Layer1[Firebase Auth: Token Validation]
    Layer1 --> Layer2[Firestore Rules: Relational Check]
    
    subgraph "Validation Logic"
    Layer2 --> Owner{request.auth.uid == resource.data.ownerId?}
    Owner -- No --> Deny[403: Forbidden]
    Owner -- Yes --> Access[Allow READ/WRITE]
    
    Owner -- God Admin? --> Master[Bypass ownerId Check]
    end
```

## 6. Real-time Notification & Audit System
```mermaid
graph LR
    Event[System Event: New Lead] --> Write[(Firestore: /notifications)]
    Write --> Node[Real-time Listener]
    Node --> Badge[Update Bell Icon Unread Count]
    
    Badge --> Open[User Views List]
    Open --> Mark[Action: Mark as Read]
    Mark --> Update[(Firestore: status = 'read')]
    
    Event --> Audit[Write to /logs]
    Audit --> God[God Admin Audit Dashboard]
```

## 7. Edge Cases & Error Handling
| Trigger | Action | Outcome |
| :--- | :--- | :--- |
| **Quota Full** | Check bytes on upload | Disable 'Upload' button; Show 'Storage Full' Toast |
| **Auth Expiry** | Listener detects null user | Clear LocalState; Redirect to /login |
| **Invalid Slug** | Query returns empty | Render 404 Custom Branded Page |
| **Rule Violation** | Catch Firebase Error | Log to Console; Show 'Permission Denied' Dialog |

## 8. High-Level Architecture Layer
```mermaid
graph TD
    subgraph "Frontend Layer (React 18 + Vite)"
    UI[Interactive Dashboard]
    Hooks[useAuth, useNotifications]
    Logic[PDF & SEO Utils]
    end
    
    subgraph "Managed Services (Firebase)"
    Auth[Identity Platform]
    Fire[Firestore Real-time NoSQL]
    Store[Cloud Storage for Media]
    end
    
    subgraph "External Integrations"
    AI[Gemini AI Engine]
    API[IP & Analytics Trackers]
    end
    
    UI <--> Hooks
    Hooks <--> Auth & Fire
    Logic <--> Store & AI
```

---
**VGOT Precision SaaS Blueprint**
Status: Verified Modular & Scalable
Last Revision: May 2024
Architecture: Enterprise Edition (Enterprise Tier Firestore)
