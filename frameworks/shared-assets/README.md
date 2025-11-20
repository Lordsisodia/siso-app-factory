# Shared Framework Assets

Use this area for artifacts referenced by multiple frameworks (SQL snippets, ERDs, CLI helpers, theme presets, etc.).

```
shared-assets/
  sql/        # Reusable migrations, views, seed data
  scripts/    # CLI helpers (e.g., create-client.ts)
```

Keep individual framework folders lean by linking back to these shared files instead of duplicating them.
