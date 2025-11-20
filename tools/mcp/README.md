# MCP Orchestration Templates

These files originate from THE GREAT LIBRARY OF SISO (MCP Workhouse). They describe the minimum server set each cloned project should configure via `pnpm mcp:init` inside its **own workspace**.

## Required Servers (Phase 1)
| Server | Repo | Purpose | Template |
|--------|------|---------|----------|
| GitHub | `modelcontextprotocol/servers/github` | Repo browsing, issues, PRs | `templates/github.config.jsonc` |
| Reddit | `GridfireAI/reddit-mcp` | Community research automation | `templates/reddit.config.jsonc` |
| Token Saver | `TokenSaverHQ/token-saver-mcp` | Token optimization for AI searches | `templates/tokensaver.config.jsonc` |

## Optional (Phase 2+)
- Slack MCP (`modelcontextprotocol/servers/slack`) for team comms
- Puppeteer MCP for browser automation (ties into testing upgrades)
- Zen MCP (context revival) once vetted

## Usage in a New Project Workspace
1. Copy this repo’s `project-setup-system/` into `~/DEV/projects/<slug>/project-setup-system/` per `AI-START.md`.
2. Run `pnpm mcp:init --workspace ~/DEV/projects/<slug>` from the project root.
3. Fill in API tokens/URLs inside `.mcp/config/github.json`, `.mcp/config/reddit.json`, `.mcp/config/tokensaver.json`.
4. Document credentials + scopes in `workspace-notes/credentials.md`.
5. Reference MCP availability in `docs/01-research/research-plan.md` and `docs/05-technical/architecture.md` so downstream agents know which tools are online.

> This folder should **never** contain client secrets—only templates + guides.
