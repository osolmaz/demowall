import { fail, ok, type CommandResult } from "../common/result.js";
import { runGridCommand } from "../demowall/grid.js";
import { runRecordCommand } from "../demowall/record.js";

export async function run(args: readonly string[]): Promise<CommandResult> {
  if (args[0] === "grid") {
    return runGridCommand(args.slice(1));
  }
  if (args[0] === "record") {
    return runRecordCommand(args.slice(1));
  }
  if (args.length === 0 || args[0] === "-h" || args[0] === "--help") {
    return ok(usage());
  }
  return fail(`demowall: unknown command ${args[0] ?? ""} (see demowall --help)`);
}

export function usage(): string {
  return `${[
    "demowall - run N copies of any CLI in a tiled tmux wall and record it",
    "",
    "usage:",
    "  demowall grid --concurrency <n> [options] -- command...",
    "  demowall record --session <name> --out <file.mp4> [options]",
    "",
    "commands:",
    "  grid      launch a balanced tmux grid of identical panes",
    "  record    record a tmux session in a themed Ghostty window (X11)",
    "",
    "Run `demowall grid --help` or `demowall record --help` for details."
  ].join("\n")}\n`;
}
