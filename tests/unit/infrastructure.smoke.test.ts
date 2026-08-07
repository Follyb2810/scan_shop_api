import { describe, expect, it } from "vitest";
import { assertDatabaseReachable, prisma } from "../helpers/test-db";
import { env } from "../../src/config/env";
import { redisPing } from "../../src/infrastructure/cache";
import { withTransaction } from "../../src/infrastructure/database";
import {
  getTenantId,
  setTenantOnContext,
  RequestContext,
} from "../../src/shared/types/RequestContext";

describe("infrastructure smoke", () => {
  it("reaches the database (SQLite by default)", async () => {
    await assertDatabaseReachable();
    expect(env.DATABASE_PROVIDER).toBe("sqlite");
  });

  it("runs a prisma transaction helper", async () => {
    const value = await withTransaction(async (tx) => {
      // tx is usable; SELECT 1 via underlying client when available
      void tx;
      return 123;
    });
    expect(value).toBe(123);
    // ensure client still works after transaction
    await prisma.$queryRaw`SELECT 1`;
  });

  it("request context tenant helpers", () => {
    const ctx: RequestContext = {
      requestId: "r1",
      permissions: [],
    };
    setTenantOnContext(ctx, "org-1");
    expect(ctx.organizationId).toBe("org-1");
    expect(ctx.tenantId).toBe("org-1");
    expect(getTenantId(ctx)).toBe("org-1");
  });

  it("redis ping respects REDIS_ENABLED", async () => {
    if (!env.REDIS_ENABLED) {
      expect(await redisPing()).toBe(false);
      return;
    }
    // When enabled (docker up), this should succeed
    expect(await redisPing()).toBe(true);
  });
});
