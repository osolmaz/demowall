import { describe, expect, it } from "vitest";

import { runCommand, spawnDetached } from "../src/demowall/exec.js";

describe("runCommand", () => {
  it("resolves with code 0 and captured stdout on success", async () => {
    const result = await runCommand("printf", ["hello"]);

    expect(result.code).toBe(0);
    expect(result.stdout).toBe("hello");
    expect(result.stderr).toBe("");
  });

  it("resolves with the non-zero exit code instead of rejecting", async () => {
    const result = await runCommand("false", []);

    expect(result.code).toBe(1);
  });

  it("resolves with code 127 and a message when the executable is missing", async () => {
    const result = await runCommand("demowall-no-such-binary", []);

    expect(result.code).toBe(127);
    expect(result.stderr).not.toBe("");
  });

  it("passes a custom environment through to the child", async () => {
    const result = await runCommand("sh", ["-c", 'printf %s "$DEMOWALL_TEST_VAR"'], {
      DEMOWALL_TEST_VAR: "wall"
    });

    expect(result.stdout).toBe("wall");
  });
});

describe("spawnDetached", () => {
  it("exposes the pid and eventual exit code", async () => {
    const handle = spawnDetached("true", [], process.env);

    expect(handle.pid).toBeGreaterThan(0);
    await expect(handle.exited).resolves.toBe(0);
  });

  it("resolves exited with null when killed by a signal", async () => {
    const handle = spawnDetached("sleep", ["30"], process.env);
    handle.kill("SIGKILL");

    await expect(handle.exited).resolves.toBeNull();
  });

  it("resolves exited with null when the executable is missing", async () => {
    const handle = spawnDetached("demowall-no-such-binary", [], process.env);

    expect(handle.pid).toBeUndefined();
    await expect(handle.exited).resolves.toBeNull();
  });
});
