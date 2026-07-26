# demowall

demowall is a CLI for building and recording terminal demo walls. It runs N
copies of any command in a balanced tmux grid and records a tmux session to
an mp4 in a themed Ghostty window, which turns a wall of CLI coding agents
(or anything else that runs in a terminal) into a screen-filling live demo
and a video of it.

The pane command is opaque: demowall knows nothing about the programs it
runs. A wall of coding agents, a wall of `htop`s, and a wall of local LLM
demo sessions are all the same two commands.

## Requirements

- `tmux` (grid and recording)
- `ghostty`, `ffmpeg`, `xdotool`, `xwininfo` on an X11 desktop (recording only)

## Install

```bash
npm install -g github:osolmaz/demowall
```

Or for development:

```bash
git clone https://github.com/osolmaz/demowall
cd demowall
npm install && npm run build && npm link
```

## Usage

`demowall grid` previews by default and only creates panes with `--start`:

```bash
# Preview the plan (no tmux session is created):
demowall grid --concurrency 4 -- my-agent-command

# Launch a 2x2 wall:
demowall grid --concurrency 4 --start -- my-agent-command

# A 4x4 wall needs an explicit opt-in above the safe limit:
demowall grid --concurrency 16 --allow-high-concurrency --min-available-gb 24 --start \
  -- my-agent-command

# View the wall:
tmux attach -t demowall-<timestamp>
```

Each pane runs the same command with `DEMOWALL_PANE_INDEX` and
`DEMOWALL_PANE_TOTAL` set, so a command can vary its behavior by position if
it wants to. tmux's `tiled` layout keeps the grid square (2x2 for 4 panes,
4x4 for 16).

Safety gates: pane counts above the safe limit (default 4, or
`DEMOWALL_MAX_SAFE_CONCURRENCY`) need `--allow-high-concurrency`, which
should reflect what the panes' shared backend can actually serve;
`--min-available-gb` (or `DEMOWALL_MIN_AVAILABLE_GB`) refuses to launch on a
memory-tight machine.

`demowall record` attaches a Ghostty window (default theme: Catppuccin
Mocha) to any tmux session and captures exactly that window with ffmpeg:

```bash
demowall record --session demowall-<timestamp> --out demo.mp4 --seconds 60
```

Recording stops when the Ghostty window closes, when `--seconds` elapses, or
on `ctrl-c`, and the mp4 is finalized cleanly in all cases. `--font-size`,
`--columns`, `--rows`, `--framerate`, and `--theme` control the window and
capture; `--display` selects the X11 display, which also works with a
headless `Xvfb` server for reproducible captures.

Run `demowall grid --help` and `demowall record --help` for the full option
list.

## License

[MIT](LICENSE)
