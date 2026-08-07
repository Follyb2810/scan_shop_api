# Implementation Roadmap

Aligned with [BUILD_GUIDE.md](../BUILD_GUIDE.md).  
**Gate:** Steps 1+ require `Approve Step 0`.

---

## Principles

1. Architecture docs first (this package).
2. One step at a time; each step ships migration + tests + Swagger + progress note.
3. Do not grow legacy `src/module/product` — migrate concepts into bounded modules.
4. Tenant isolation tests from Step 6 are forever regression suite.
5. Prefer vertical slices that are production-shaped, even if MVP-thin inside a module.

---

## Timeline by step

| Step | Phase | Deliverable | Depends on |
|------|-------|-------------|------------|
| **0** | Design | SAD, domain model, ERD, Prisma proposal, RBAC, API outline, folder structure, roadmap | — |
| **1** | Foundation | Folder skeleton, env/Zod, Pino, Docker Compose (Postgres+Redis), Express bootstrap, health | Step 0 approval |
| **2** | Foundation | Prisma/Redis/BullMQ clients, request context, DI, test helpers | 1 |
| **3** | Foundation | Middleware shell, `/api/v1`, Swagger UI | 2 |
| **4** | Access | Identity: register/login/refresh/2FA/sessions | 3 |
| **5** | Access | RBAC permissions + platform/org role seeds + enforcement | 4 |
| **6** | Tenancy | Organizations, branches, memberships, tenant middleware + isolation tests | 5 |
| **7** | Tenancy | Workflow engine; org approval via workflow | 6 |
| **8** | Product | Catalog hierarchy | 7 |
| **9** | Product | Batches / QA / recall fields | 8 |
| **10** | Product | Warehouses | 6 (can parallel after 6; scheduled after 9 for linear guide) |
| **11** | Product | Inventory positions + movements | 9, 10 |
| **12** | Product | Verification units + HMAC scans | 9, 11 |
| **13** | Commerce | Supply-chain custody transfers | 11, 12 |
| **14** | Commerce | Marketplace + customer | 8, 11, 7 |
| **15** | Commerce | Payments (stub provider OK) | 14 |
| **16** | Ops | Notifications + BullMQ workers | 2, events from prior |
| **17** | Ops | Analytics endpoints | 12–15 data |
| **18** | Ops | Audit module wired across mutations | 6+ |
| **19** | Harden | Security pass + isolation regression | all prior |
| **20** | Harden | Docs completion (ERD/Swagger/checklists) | 19 |
| **21** | Harden | Full test suite / release candidate | 20 |

---

## Milestone view

```text
M0  Architecture approved                    [Step 0]
M1  Secure multi-tenant core                 [Steps 1–7]
M2  Traceable product + stock + scan         [Steps 8–12]
M3  Chain + marketplace commerce             [Steps 13–15]
M4  Ops + compliance surface                 [Steps 16–18]
M5  Production-ready RC                      [Steps 19–21]
```

---

## Recommended demo script after M2

1. Platform admin approves Manufacturer org  
2. Manufacturer creates Paracetamol 500mg package + batch  
3. Generate retail unit QR codes  
4. Receive into Main warehouse  
5. Transfer to Pharmacy org  
6. Pharmacy receives inventory  
7. Customer/public scan verifies authenticity + custody  

Marketplace demo waits for M3.

---

## Parallelization (optional later)

If multiple agents/devs:

- After Step 6: warehouse (10) can proceed beside catalog (8) carefully  
- Notification adapters can stub early  

For this guided build: **stay linear** (`Do Step N` only).

---

## Decision log (Step 0 defaults)

| Topic | Decision |
|-------|----------|
| Tenancy | Shared Postgres schema + `organizationId` RLS-by-code |
| Legacy DB | Clean Postgres schema; archive SQLite prototype |
| Architecture | Modular monolith + clean architecture per module |
| Approvals | Generic workflow engine |
| QR security | HMAC-SHA256 versioned payload |
| Customers | Platform users with `CustomerProfile`, not tenants |
| Permissions | Platform-owned catalog; org custom roles assign only |
| Password hashing | Prefer argon2id in Step 4; bcrypt acceptable fallback |
| API style | REST `/api/v1` |
| Jobs | BullMQ on Redis |

Change any decision by commenting on Step 0 **before** `Approve Step 0`.

---

## Exit criteria for “Healthcare OS v1 RC”

- [ ] Multi-org isolation proven by tests  
- [ ] RBAC enforced on org + platform routes  
- [ ] Catalog → batch → warehouse → inventory → signed scan path works  
- [ ] Inter-org transfer updates custody + stock  
- [ ] Customer can place paid order (stub provider)  
- [ ] Audit + notifications for critical events  
- [ ] Docker Compose deploy documented  
- [ ] OpenAPI covers shipped routes  

---

## Next action

User reviews this architecture package, then:

```text
Approve Step 0
```

After approval, agent runs:

```text
Do Step 1
```
