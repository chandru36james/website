# 07. User Interface Standards & State Management

VYFL UI is engineered for modern microfinance workflows, prioritizing content-dense layouts, lightning-fast interactions, and robust state synchronization.

---

## 🎨 1. Typography & Aesthetic Guide

The interface rejects default web looks in favor of a customized, high-contrast, professional palette.

```
+-----------------------------------------------------------------+
|                         INTER / OUTFIT                          |
|         Primary sans-serif for menus, labels, and dialogs       |
+-----------------------------------------------------------------+
|                        JETBRAINS MONO                           |
|        Monospaced digits for tabular reports and financial logs |
+-----------------------------------------------------------------+
```

* **Fonts**:
  * **Sans-serif (UI Framework)**: **Inter** and **Outfit** for absolute legibility under bright sunlight or small mobile screens.
  * **Monospace (Tabular Ledgers)**: **JetBrains Mono** applied to currency displays, transaction rates, dates, and balance figures.
* **Visual Contrast**:
  * Off-white background canvas (`bg-slate-50`) paired with solid border separators (`border-slate-200`) and coal text colors (`text-slate-900`) to guarantee a high contrast ratio ($> 4.5:1$), meeting accessibility standards.

---

## 🛠️ 2. State Management Rules & Data Lifecycle

To prevent infinite rerenders, UI lag, and network state pollution, components follow rigid data lifecycle guidelines:

```
        ┌────────────────────────────────────────────────────────┐
        │                 VFMSProvider (Context)                 │
        │    Holds base lists: customers, loans, cashbooks       │
        └───────┬────────────────────────────────────────┬───────┘
                │ (Reads base list)                      │ (Writes / Mutates)
                ▼                                        ▼
  ┌──────────────────────────┐             ┌───────────────────────────┐
  │      Rendered View       │             │    Optimistic Mutation    │
  │     (Filters / Sorts)    │             │   Appends locally before  │
  └──────────────────────────┘             │      database confirm     │
                                           └───────────────────────────┘
```

1. **Primitive-Driven `useEffect` Hooks**:
   * Dependency arrays must rely strictly on primitive values (e.g., string IDs, numbers, booleans) instead of arrays, objects, or anonymous functions, avoiding infinite update cascades.
2. **Local Component Slicing**:
   * Do not pack search filters, form expansion states, or sorting selections into the global context. Keep interactive view filters localized within component hooks (e.g. inside `CustomersView.tsx`).
3. **Optimistic UI Updates**:
   * Form submissions append the newly created record instantly to the memory state, with a temporary loading tag, allowing the user to continue operating while network promises settle in the background.
4. **Boundary Isolation**:
   * Critical sections (e.g., charts or ledger lines) are wrapped in React Error Boundaries to prevent a mathematical division-by-zero error from crashing the entire applet workspace.
