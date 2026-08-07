import { describe, expect, it, beforeAll } from "vitest";
import request from "supertest";
import { Application } from "express";
import { createApp } from "../../src/app";
import { rbacService } from "../../src/modules/rbac/application/rbac.service";
import { clearPermissionMemoryCache } from "../../src/modules/rbac/infrastructure/permission-cache";

describe("Step 8 Catalog hierarchy", () => {
  let app: Application;
  const password = "Password123!";

  let ownerToken = "";
  let ownerBToken = "";
  let approverToken = "";
  let orgId = "";
  let orgBId = "";
  let medicineId = "";

  beforeAll(async () => {
    clearPermissionMemoryCache();
    app = createApp();

    const owner = await request(app).post("/api/v1/auth/register").send({
      email: `cat-owner-${Date.now()}@example.com`,
      password,
    });
    ownerToken = owner.body.data.tokens.accessToken;

    const ownerB = await request(app).post("/api/v1/auth/register").send({
      email: `cat-owner-b-${Date.now()}@example.com`,
      password,
    });
    ownerBToken = ownerB.body.data.tokens.accessToken;

    const approver = await request(app).post("/api/v1/auth/register").send({
      email: `cat-approver-${Date.now()}@example.com`,
      password,
    });
    approverToken = approver.body.data.tokens.accessToken;
    await rbacService.assignPlatformRole(
      approver.body.data.user.id,
      "SUPER_ADMIN"
    );

    const created = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Catalog Pharma",
        slug: `catalog-pharma-${Date.now()}`,
        typeKey: "MANUFACTURER",
      });
    orgId = created.body.data.organization.id;

    await request(app)
      .post(`/api/v1/workflows/instances/${created.body.data.approvalWorkflow.id}/actions`)
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    const createdB = await request(app)
      .post("/api/v1/organizations")
      .set("Authorization", `Bearer ${ownerBToken}`)
      .send({
        name: "Other Org",
        slug: `other-org-${Date.now()}`,
        typeKey: "PHARMACY",
      });
    orgBId = createdB.body.data.organization.id;

    await request(app)
      .post(
        `/api/v1/workflows/instances/${createdB.body.data.approvalWorkflow.id}/actions`
      )
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    clearPermissionMemoryCache();
  });

  it("lists seeded reference data", async () => {
    const cats = await request(app).get("/api/v1/catalog/categories");
    expect(cats.status).toBe(200);
    expect(cats.body.data.categories.map((c: { key: string }) => c.key)).toContain(
      "ANTIBIOTIC"
    );

    const forms = await request(app).get("/api/v1/catalog/dosage-forms");
    expect(forms.body.data.dosageForms.map((f: { key: string }) => f.key)).toContain(
      "TABLET"
    );

    const packs = await request(app).get("/api/v1/catalog/packaging-types");
    expect(
      packs.body.data.packagingTypes.map((p: { key: string }) => p.key)
    ).toContain("RETAIL_UNIT");
  });

  it("creates full hierarchy Family → Brand → Medicine → Variant → Package", async () => {
    clearPermissionMemoryCache();
    const sku = `AMOX-500-${Date.now()}`;
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/hierarchy`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        family: { name: "Antibiotics", description: "Anti-infectives" },
        brand: { name: "HealthPlus" },
        medicine: {
          name: "Amoxicillin",
          categoryKey: "ANTIBIOTIC",
          description: "Broad-spectrum penicillin",
        },
        variant: {
          name: "Amoxicillin 500mg Capsule",
          strength: "500mg",
          sku,
          dosageFormKey: "CAPSULE",
          color: "white",
        },
        package: {
          name: "Blister 10x10",
          unitsPerPackage: 100,
          packagingTypeKey: "BLISTER",
          barcodeTemplate: `${sku}-{NNNN}`,
        },
      });

    expect(res.status).toBe(201);
    const h = res.body.data.hierarchy;
    expect(h.family.name).toBe("Antibiotics");
    expect(h.brand.name).toBe("HealthPlus");
    expect(h.medicine.name).toBe("Amoxicillin");
    expect(h.medicine.status).toBe("draft");
    expect(h.medicine.category.key).toBe("ANTIBIOTIC");
    expect(h.medicine.variants.length).toBe(1);
    expect(h.medicine.variants[0].strength).toBe("500mg");
    expect(h.medicine.variants[0].dosageForm.key).toBe("CAPSULE");
    expect(h.medicine.variants[0].packages.length).toBe(1);
    expect(h.medicine.variants[0].packages[0].unitsPerPackage).toBe(100);
    expect(h.package.packagingType.key).toBe("BLISTER");
    medicineId = h.medicine.id;
  });

  it("rejects duplicate SKU in same org", async () => {
    const medicines = await request(app)
      .get(`/api/v1/organizations/${orgId}/medicines`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    const sku = medicines.body.data.medicines[0].variants[0].sku;

    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/variants`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId)
      .send({
        medicineId,
        name: "Dup",
        sku,
      });

    expect(res.status).toBe(409);
  });

  it("blocks cross-tenant catalog access", async () => {
    const res = await request(app)
      .get(`/api/v1/organizations/${orgId}/medicines/${medicineId}`)
      .set("Authorization", `Bearer ${ownerBToken}`)
      .set("X-Organization-Id", orgBId);

    // route syncs orgId from params to context; membership of B on org A fails
    expect([403, 404]).toContain(res.status);
  });

  it("submits medicine draft → submitted and starts product.approval", async () => {
    clearPermissionMemoryCache();
    const res = await request(app)
      .post(`/api/v1/organizations/${orgId}/medicines/${medicineId}/submit`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(res.status).toBe(200);
    expect(res.body.data.medicine.status).toBe("submitted");
    expect(res.body.data.approvalWorkflow?.definition?.key).toBe(
      "product.approval"
    );
  });

  it("approves product workflow → medicine approved", async () => {
    clearPermissionMemoryCache();
    const list = await request(app)
      .get("/api/v1/workflows/instances")
      .query({
        subjectType: "product",
        subjectId: medicineId,
        status: "pending",
      })
      .set("Authorization", `Bearer ${approverToken}`);

    expect(list.status).toBe(200);
    const instanceId = list.body.data.instances[0]?.id;
    expect(instanceId).toBeTruthy();

    const res = await request(app)
      .post(`/api/v1/workflows/instances/${instanceId}/actions`)
      .set("Authorization", `Bearer ${approverToken}`)
      .send({ decision: "approve" });

    expect(res.status).toBe(200);
    expect(res.body.data.instance.status).toBe("approved");

    const medicine = await request(app)
      .get(`/api/v1/organizations/${orgId}/medicines/${medicineId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .set("X-Organization-Id", orgId);

    expect(medicine.body.data.medicine.status).toBe("approved");
  });
});
