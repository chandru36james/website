# 09. Deployment, Backup & Disaster Recovery Specification

To ensure high availability, fast container starts, and bulletproof data durability, VYFL adheres to a strict Cloud Run container deployment structure and a systematic automated backup strategy.

---

## 🏗️ 1. Container Configuration & Port Mapping

The platform is designed to compile and run as a self-contained container on platforms such as Google Cloud Run.

* **Port Access Rule**:
  * **Strict Port**: All external ingress traffic routes through port `3000`. Do not read or customize the environment `PORT` variable. The container is configured with an Nginx reverse proxy mapped to route standard external calls to port `3000`.
* **Build Command**:
  ```bash
  npm run build
  ```
  This command invokes Vite to bundle the static React files into `/dist` and runs Esbuild to bundle the server entry point `/server.ts` into a standalone, optimized CommonJS file `/dist/server.cjs`.
* **Runtime Command**:
  ```bash
  npm run start
  ```
  Launches the Node process on the compiled bundle: `node dist/server.cjs`.

---

## 💾 2. Backup & Retention Policy

Data durability is critical to maintaining microfinance ledger compliance.

### A. Automatic Backup Schedule
* **Firestore Backups**:
  * **Frequency**: Triggered automatically every 24 hours at 01:00 UTC using Cloud Scheduler and Cloud Functions.
  * **Location**: Exported as standardized Firestore documents to a Multi-Regional Google Cloud Storage bucket with bucket-level encryption enabled.
* **SQL Backups (if Cloud SQL is enabled)**:
  * Automated daily automated exports with Point-in-Time Recovery (PITR) logs enabled, supporting transaction level rollback with a resolution of 1 second.

### B. Retention Bands
* **Active Backups**: Retained on daily logs for 35 days.
* **Monthly Archives**: Retained for 12 months.
* **Annual Legal Archives**: Consolidated and moved to Coldline/Archive storage classes for 7 years to satisfy local financial compliance and anti-money laundering (AML) laws.

---

## 🚨 3. Recovery Verification & Disaster Recovery (DR)

* **Recovery Point Objective (RPO)**: Under 24 hours (maximum data loss is capped at the previous day's daily closing backup, or under 5 minutes if point-in-time database logging is operational).
* **Recovery Time Objective (RTO)**: Under 4 hours (maximum duration of service interruption during an outage event).
* **Validation Drills**: Operations teams must execute simulated database restorations twice per year to verify export readability, index rebuilding times, and credentials mapping processes.
