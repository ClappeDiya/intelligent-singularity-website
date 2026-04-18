-- scripts/rollback/new-collections.sql
--
-- Rolls back the three new Payload collections and three new globals
-- introduced by the six-transparency-pages feature:
--   - release_notes (+ related _rels, _v, _locales tables)
--   - roadmap_items
--   - journal_posts
--   - status_page (global)
--   - trust_page (global)
--   - help_page (global)
--
-- Usage (dev):
--   docker compose exec -T postgres psql -U is -d is_dev < scripts/rollback/new-collections.sql
--
-- Usage (prod, ONLY after the previous container image has been redeployed
-- via Dokploy so the app no longer references these tables):
--   psql "$DATABASE_URL" < scripts/rollback/new-collections.sql
--
-- CASCADE drops any foreign-key relations Payload auto-generated (array
-- child tables, locale pivot tables, version tables, etc.). It is safe
-- because no OTHER collection in the schema references these new tables
-- — they are additive and isolated.
--
-- Tables are dropped inside a transaction. If anything fails the whole
-- rollback is aborted and the database is left untouched.

BEGIN;

-- Core tables
DROP TABLE IF EXISTS release_notes CASCADE;
DROP TABLE IF EXISTS roadmap_items CASCADE;
DROP TABLE IF EXISTS journal_posts CASCADE;

-- Payload-generated array / rels / locale tables
DROP TABLE IF EXISTS release_notes_changes CASCADE;
DROP TABLE IF EXISTS release_notes_changes_locales CASCADE;
DROP TABLE IF EXISTS release_notes_authors CASCADE;
DROP TABLE IF EXISTS release_notes_locales CASCADE;

DROP TABLE IF EXISTS roadmap_items_git_refs CASCADE;
DROP TABLE IF EXISTS roadmap_items_locales CASCADE;

DROP TABLE IF EXISTS journal_posts_sources CASCADE;
DROP TABLE IF EXISTS journal_posts_tags CASCADE;
DROP TABLE IF EXISTS journal_posts_rels CASCADE;
DROP TABLE IF EXISTS journal_posts_locales CASCADE;

-- Globals
DROP TABLE IF EXISTS status_page CASCADE;
DROP TABLE IF EXISTS status_page_locales CASCADE;
DROP TABLE IF EXISTS status_page_groups CASCADE;
DROP TABLE IF EXISTS status_page_groups_locales CASCADE;
DROP TABLE IF EXISTS status_page_groups_monitor_ids CASCADE;

DROP TABLE IF EXISTS trust_page CASCADE;
DROP TABLE IF EXISTS trust_page_locales CASCADE;
DROP TABLE IF EXISTS trust_page_pillars CASCADE;
DROP TABLE IF EXISTS trust_page_pillars_locales CASCADE;
DROP TABLE IF EXISTS trust_page_pillars_proof CASCADE;
DROP TABLE IF EXISTS trust_page_pillars_proof_locales CASCADE;
DROP TABLE IF EXISTS trust_page_certifications CASCADE;
DROP TABLE IF EXISTS trust_page_subprocessors CASCADE;
DROP TABLE IF EXISTS trust_page_subprocessors_locales CASCADE;

DROP TABLE IF EXISTS help_page CASCADE;
DROP TABLE IF EXISTS help_page_locales CASCADE;
DROP TABLE IF EXISTS help_page_routes CASCADE;
DROP TABLE IF EXISTS help_page_routes_locales CASCADE;
DROP TABLE IF EXISTS help_page_routes_links CASCADE;
DROP TABLE IF EXISTS help_page_routes_links_locales CASCADE;
DROP TABLE IF EXISTS help_page_popular_questions CASCADE;
DROP TABLE IF EXISTS help_page_popular_questions_locales CASCADE;

COMMIT;

-- After running, Payload will re-create the schema on next `pnpm dev` or
-- `pnpm build` because `payload.config.ts` uses `push: true` on the
-- Postgres adapter. If you truly want the new collections gone, remove
-- the imports from payload.config.ts in the same PR as this rollback.
