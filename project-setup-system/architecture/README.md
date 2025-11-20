# Architecture Templates

Use this folder to describe the **reference architecture** every SISO App Factory project should follow after running `setup-new-project.sh`. The goal is to give AI agents (and humans) a concrete directory map to mirror when scaffolding new repos.

## Files
-
- `TEMPLATE-ARCHITECTURE.md` – canonical structure + descriptions.
- (Future) add industry-specific overlays such as `architecture/restaurant.md`, `architecture/wellness.md`, etc. that point back to the template and highlight deviations.

## How to Use
1. Copy the template tree into your project README or internal docs so contributors understand the expected layout.
2. If you extend the structure (e.g., add a `workers/` folder for background jobs), update this template so the next project inherits the same conventions.
3. For scripts that enforce repo scaffolding, parse this template to keep the folder list in sync.
