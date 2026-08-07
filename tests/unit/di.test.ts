import { describe, expect, it, beforeEach } from "vitest";
import { container } from "../../src/shared/di";

describe("DI container", () => {
  beforeEach(() => {
    container.clear();
  });

  it("registers and resolves singleton factory once", () => {
    let builds = 0;
    container.register("svc", () => {
      builds += 1;
      return { builds };
    });

    const a = container.resolve<{ builds: number }>("svc");
    const b = container.resolve<{ builds: number }>("svc");
    expect(a).toBe(b);
    expect(builds).toBe(1);
  });

  it("registers raw values", () => {
    container.registerValue("answer", 42);
    expect(container.resolve<number>("answer")).toBe(42);
  });

  it("throws on missing token", () => {
    expect(() => container.resolve("missing")).toThrow(/no registration/);
  });
});
