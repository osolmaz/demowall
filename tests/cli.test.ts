import { describe, expect, it } from "vitest";

import { run } from "../src/cli/cli.js";

describe("demowall cli", () => {
  it("prints top-level usage with no arguments", async () => {
    const result = await run([]);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain("demowall grid --concurrency <n>");
    expect(result.stdout).toContain("demowall record --session <name>");
  });

  it("prints top-level usage with --help", async () => {
    const result = await run(["--help"]);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain("tiled tmux wall");
  });

  it("dispatches to grid", async () => {
    const result = await run(["grid", "--help"]);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain("demowall grid - run N copies of a command");
  });

  it("dispatches to record", async () => {
    const result = await run(["record", "--help"]);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain("demowall record - record a tmux session");
  });

  it("rejects unknown commands", async () => {
    const result = await run(["frobnicate"]);

    expect(result.code).toBe(2);
    expect(result.stderr).toContain("unknown command frobnicate");
  });
});
