# AGENTS.md - demowall

This repository is a TypeScript CLI that runs N copies of any command in a
tiled tmux wall and records tmux sessions to video in a themed Ghostty window.

Before finishing code changes, run:

```bash
npm run check
```

Rules:

- Keep TypeScript strict. Do not use `any`; validate unknown JSON at the boundary.
- Keep the tool command-agnostic. The pane command is an opaque shell command;
  do not add logic that inspects, special-cases, or configures specific pane
  programs (localpi, diffusionpi, pi, or any other CLI).
- Keep grid orchestration and recording in separate modules; external process
  execution goes through the injectable runners in `src/demowall/exec.ts` so
  everything stays testable without tmux or a display.
- Add or update tests for behavior changes.
- Do not commit generated output, recordings, or secrets.
- Follow the Slophammer agent entrypoint in
  `osolmaz/slophammer/docs/AGENT_ENTRYPOINT.md` when changing repo structure or
  quality gates.
