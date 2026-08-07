import { describe, expect, it } from "vitest";
import {
  buildCursorMeta,
  buildOffsetMeta,
  getOffset,
  parsePagination,
} from "../../src/shared/http/pagination";

describe("pagination helpers", () => {
  it("parses page/limit with defaults", () => {
    const parsed = parsePagination({});
    expect(parsed.page).toBe(1);
    expect(parsed.limit).toBe(20);
  });

  it("computes offset and offset meta", () => {
    expect(getOffset(3, 10)).toBe(20);
    const meta = buildOffsetMeta(2, 10, 35);
    expect(meta.totalPages).toBe(4);
    expect(meta.hasNext).toBe(true);
    expect(meta.hasPrev).toBe(true);
  });

  it("builds cursor meta", () => {
    expect(buildCursorMeta(20, "abc").hasNext).toBe(true);
    expect(buildCursorMeta(20, null).hasNext).toBe(false);
  });
});
