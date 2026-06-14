# Security Specification: VGOTYOU CMS

## 1. Data Invariants
- Each Page and Lead MUST have an `ownerId` matching the creator's UID.
- Public users can only read 'published' pages.
- Access to private pages, leads, and analytics requires authentication and either ownership or admin role.
- Users cannot change their own roles or assigned pages.
- Emails must be verified for any write operations (except lead generation).

## 2. Dirty Dozen Payloads (Attack Scenarios)

1. **Identity Spoofing**: Attempt to create a page with `ownerId` of another user.
2. **Privilege Escalation**: Attempt to update own user profile to set `role: 'admin'`.
3. **Draft Leak**: Attempt to read a page where `status == 'draft'` as an unauthenticated user.
4. **Lead Ransom**: Attempt to read leads belonging to a different `ownerId`.
5. **Shadow Field Injection**: Attempt to add `isVerified: true` to a page document during update.
6. **Orphaned Writes**: Attempt to create a page with a malformed `ownerId`.
7. **Resource Poisoning**: Use a 2KB string as a document ID for a page.
8. **Denial of Wallet**: Attempt to list all users without a filter.
9. **XSS Injection**: Attempt to save raw `<script>` tags in `customCode` without sanitization.
10. **State Shortcut**: Attempt to change a lead status from `new` to `closed` without passing through `contacted` (if enforced).
11. **PII Leak**: Attempt to list user emails as a non-admin.
12. **Audit Bypass**: Perform actions without triggering `logAction` (frontend constraint, but rules should restrict certain fields).

## 3. Test Runner Design

We will implement `firestore.rules.test.ts` to verify:
- Permission Denied for unauthenticated reads on sensitive collections.
- Permission Denied for cross-user writes/reads.
- Valid Schema enforcement.
- Admin bypass permissions.

## 4. Role-Based Access Control
- **Admin**: All collections, all operations.
- **Editor**: Can create/edit/delete PAGES they own or are assigned to.
- **Viewer**: Read-only access to their assigned resources.
- **Public**: Create 'leads', Read 'published' pages.
