import { describe, expect, it } from "vitest";
import { err, ok, unwrap } from "../../src/shared/types/Result";
import { eventBus } from "../../src/infrastructure/events";

describe("Result helpers", () => {
  it("unwraps ok values", () => {
    expect(unwrap(ok(7))).toBe(7);
  });

  it("throws on err", () => {
    expect(() => unwrap(err(new Error("nope")))).toThrow("nope");
  });
});

describe("event bus", () => {
  it("delivers events to subscribers", async () => {
    const seen: number[] = [];
    const off = eventBus.on<number>("test.ping", (n) => {
      seen.push(n);
    });

    await eventBus.emit("test.ping", 1);
    await eventBus.emit("test.ping", 2);
    off();
    await eventBus.emit("test.ping", 3);

    expect(seen).toEqual([1, 2]);
    eventBus.clear();
  });
});
