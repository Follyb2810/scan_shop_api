# ERD notes (final Prisma)

Canonical schema: `prisma/schema.prisma` (Steps 0–18 models).

This file tracks **logical groupings** for the release candidate. For exhaustive fields, open Prisma / Prisma Studio.

## Core identity & tenancy

```mermaid
erDiagram
  User ||--o| CustomerProfile : has
  User ||--o{ Membership : joins
  Organization ||--o{ Membership : has
  Organization ||--o{ Branch : has
  Branch ||--o{ Warehouse : has
  Organization }o--|| OrganizationType : typed
```

## Catalog → batch → inventory → verification

```mermaid
erDiagram
  PackageDefinition ||--o{ Batch : produces
  Batch ||--o{ InventoryPosition : stocks
  Warehouse ||--o{ InventoryPosition : holds
  Batch ||--o{ TrackableUnit : units
  TrackableUnit ||--o{ ScanEvent : scanned
```

## Marketplace & payments

```mermaid
erDiagram
  CustomerProfile ||--o{ Cart : has
  Cart ||--o{ CartItem : lines
  Listing ||--o{ CartItem : listed
  CustomerProfile ||--o{ Order : places
  Organization ||--o{ Order : sells
  Order ||--o{ OrderLine : lines
  Order ||--o{ Payment : settled_by
```

## Supply chain & compliance

```mermaid
erDiagram
  Organization ||--o{ CustodyTransfer : sends
  Organization ||--o{ CustodyTransfer : receives
  CustodyTransfer ||--o{ CustodyTransferLine : lines
  Batch ||--o{ CustodyTransferLine : moved
  User ||--o{ AuditLog : actor
  User ||--o{ Notification : receives
```

Legacy `Product` / `ProductUnit` / `ProductUnitAuditLog` remain for `ENABLE_LEGACY_MODULES` only and are **not** part of the Healthcare OS domain model.

See also: [domain-model.md](./domain-model.md), [sequence-diagrams.md](./sequence-diagrams.md).
