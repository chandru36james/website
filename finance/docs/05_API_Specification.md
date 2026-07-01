# 05. REST API Standards & Specification

To ensure structured integration between client applications and server-side logic, VYFL defines a clean, predictable, and secure RESTful endpoint pattern.

---

## 🌐 1. Base URL & Security Headers

All API endpoints are hosted relative to the platform core URL:
* **Base URL**: `/api` (e.g. `https://fms.vgotyou.com/api`)
* **Headers**:
  ```http
  Content-Type: application/json
  Authorization: Bearer <firebase_id_token>
  X-Branch-ID: <active_branch_uuid>
  ```

### 🔒 Header Security Validation Policy
The `X-Branch-ID` header is not a mere routing hint or client-side preference; it is strictly audited on the server side:
1. **Token Claims Verification**: The server extracts and decodes the JWT signature from the `Authorization: Bearer <token>` header.
2. **Branch Membership Validation**: The server verifies that the requesting user's assigned `branch_id` (stored inside their authenticated user profile claims) matches the incoming `X-Branch-ID` header value exactly.
3. **Mismatches & Rejections**: If a user attempts to send a third-party `X-Branch-ID` value, the request is immediately rejected with a **`403 FORBIDDEN_RBAC`** status response, and an intrusion event is permanently recorded in the audit logs.
4. **Super Admin Privilege Exception**: Users assigned the **Super Admin** role are exempted from this localized branch filter. They are allowed to pass any valid `X-Branch-ID` header to inspect and administer data across any physical branch in the institution.

---

## 📋 2. Route Manifest

### A. Customers Module (`/api/customers`)
* **`GET /api/customers`**: Lists onboarded customers for the caller's active branch. Supporting URL queries: `?search=john&risk_grade=High`.
* **`POST /api/customers`**: Onboard a new customer.
  * **Payload**:
    ```json
    {
      "firstName": "Saman",
      "lastName": "Perera",
      "nationalId": "199201509923",
      "phone": "+94771234567",
      "riskGrade": "Medium"
    }
    ```
* **`GET /api/customers/:id`**: Fetch detailed KYC profile and loan histories.

### B. Loans Module (`/api/loans`)
* **`GET /api/loans`**: List active and pending applications.
* **`POST /api/loans`**: Formulate a new loan application (creates Draft).
  * **Payload**:
    ```json
    {
      "customerId": "cust-9912",
      "amount": 5000.00,
      "interestRate": 18.0,
      "interestType": "REDUCING",
      "termMonths": 12,
      "startDate": "2026-07-01"
    }
    ```
* **`POST /api/loans/:id/approve`**: Underwrite and approve a draft loan (Manager only).
* **`POST /api/loans/:id/disburse`**: Disburse loan principal and trigger amortization schedule generation.
* **`POST /api/loans/:id/payments`**: Submit customer repayment transaction.
  * **Payload**:
    ```json
    {
      "amount": 450.00,
      "paymentMode": "Cash",
      "collectedAt": "2026-06-30T08:31:11-07:00"
    }
    ```

### C. Cash Books Module (`/api/cashbooks`)
* **`GET /api/cashbooks`**: Read daily sheets history.
* **`POST /api/cashbooks/close`**: Accountant submits closing drawer cash totals.
* **`POST /api/cashbooks/:id/verify`**: Manager validates and locks drawer closing (Manager only).

---

## 🚨 3. Standard HTTP Status & Error Code Convention

The system returns standardized JSON payloads on all validation failures or operational constraints:

```json
{
  "status": 400,
  "errorCode": "RULE_EXCEEDED_INTEREST",
  "message": "Interest rate of 42% exceeds the Super Admin configured ceiling of 36%.",
  "timestamp": "2026-06-30T08:45:30Z"
}
```

### Core Code Mapping Table

| Status | Code String | Category | Description |
| :---: | :--- | :--- | :--- |
| **200** | `SUCCESS_OK` | Success | Request completed successfully. |
| **201** | `SUCCESS_CREATED` | Success | Entity instantiated successfully. |
| **400** | `BAD_REQUEST_PARAMS` | Validation | Missing payload parameters or format errors. |
| **400** | `RULE_EXCEEDED_INTEREST`| Business | Loan parameters breach system rules. |
| **401** | `AUTH_UNAUTHORIZED` | Security | Bearer token expired, invalid, or missing. |
| **403** | `FORBIDDEN_RBAC` | Security | Role lack permissions for requested endpoint. |
| **404** | `ENTITY_NOT_FOUND` | Database | Resource ID does not exist. |
| **409** | `CONFLICT_DUPLICATE_ID` | Database | National ID number already exists. |
| **500** | `INTERNAL_SERVER_ERROR` | Infrastructure| Unexpected error / crash. |
