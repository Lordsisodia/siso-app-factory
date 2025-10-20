# Data Architecture

Core entities
- Menu: Category, Item, Variant, ModifierGroup, Modifier, ItemAllergen, AllergenTag, AvailabilityWindow
- Specials: Special (scope: item/category; rule engine fields)
- Loyalty: Customer, PointsLedger, Reward, Redemption, Referral
- Reviews: Review (rating, text, media), ReviewReply
- Blog/CMS: Post, Tag, PostTag, PageBlock, SiteConfig
- Admin/Audit: AdminUser, AuditLog

Migrations
- Use SQL migrations (versioned) in `/migrations`.
- Seed templates: cafe, bar archetypes.

Indexing & performance
- Covering indexes for frequent filters: `item(category_id, active)`, `modifier(group_id)`, `points_ledger(customer_id, created_at)`.
- JSONB for flexible `content_json` in PageBlock; keep normalized elsewhere.

Retention
- Periodic archiving for old ledger and audit rows to keep DB <500MB on free tier.
