# Step 7 — Workflow engine

**Status:** Complete  
**Date:** 2026-08-07

---

## What shipped

### Prisma

- `WorkflowDefinition` + `WorkflowStepDefinition`
- `WorkflowInstance` (+ `startedByUserId`)
- `WorkflowAction` (approve | reject | cancel | comment)

### Module `src/modules/workflow`

- Seeded definitions for org, manufacturer, product, marketplace listing, recall, inventory
- `workflowService.startWorkflow()` — hook for other modules
- Multi-step aware approve (advance / complete), reject, cancel
- Event bus: `workflow.instance.started`, `workflow.action.recorded`, `workflow.instance.completed`

### First consumer: Organization onboarding

- `POST /organizations` creates org with `status: pending`
- Starts `organization.approval` (or `manufacturer.approval` for manufacturers)
- Completion handler maps workflow outcome → org status:
  - approved → `active`
  - rejected → `rejected`
  - cancelled → `cancelled`

### APIs

| Method | Path |
|--------|------|
| GET | `/api/v1/workflows/definitions` |
| GET | `/api/v1/workflows/instances` |
| GET | `/api/v1/workflows/instances/:id` |
| POST | `/api/v1/workflows/start` |
| POST | `/api/v1/workflows/instances/:id/actions` |

---

## Proven

`tests/integration/workflow.test.ts`:

- Org create returns pending + workflow instance
- Manufacturer uses `manufacturer.approval`
- Owner cannot approve without platform permission
- Platform SUPER_ADMIN approve → org `active`
- Reject / cancel update org status via engine events

**Suite: 65 passed**

---

## Notes

- Status flips for orgs happen only through workflow completion events (not a direct approve endpoint)
- Action permission checks resolve platform (+ optional org) grants so approvers do not need membership

---

## Next

```text
Do Step 8
```
