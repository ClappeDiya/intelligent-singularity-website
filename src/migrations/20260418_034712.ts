import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'zh-CN', 'es', 'hi', 'ar', 'fr', 'pt', 'bn', 'ru', 'ur', 'id', 'sw', 'yo', 'ha');
  CREATE TYPE "public"."enum_products_product_status" AS ENUM('production', 'staging', 'awaiting-approval', 'infrastructure');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_product_status" AS ENUM('production', 'staging', 'awaiting-approval', 'infrastructure');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('en', 'zh-CN', 'es', 'hi', 'ar', 'fr', 'pt', 'bn', 'ru', 'ur', 'id', 'sw', 'yo', 'ha');
  CREATE TYPE "public"."enum_legal_pages_slug" AS ENUM('privacy', 'terms', 'accessibility', 'cookies');
  CREATE TYPE "public"."enum_legal_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_version_slug" AS ENUM('privacy', 'terms', 'accessibility', 'cookies');
  CREATE TYPE "public"."enum__legal_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__legal_pages_v_published_locale" AS ENUM('en', 'zh-CN', 'es', 'hi', 'ar', 'fr', 'pt', 'bn', 'ru', 'ur', 'id', 'sw', 'yo', 'ha');
  CREATE TYPE "public"."enum_contact_routes_slug" AS ENUM('general', 'press', 'partnerships', 'legal');
  CREATE TYPE "public"."enum_redirects_status_code" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_release_notes_changes_type" AS ENUM('added', 'changed', 'fixed', 'removed', 'security');
  CREATE TYPE "public"."enum_release_notes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_roadmap_items_category" AS ENUM('website', 'products', 'infra', 'accessibility', 'green');
  CREATE TYPE "public"."enum_roadmap_items_status" AS ENUM('planned', 'in-progress', 'shipped', 'paused', 'cancelled');
  CREATE TYPE "public"."enum_journal_posts_status" AS ENUM('draft', 'published', 'unlisted');
  CREATE TYPE "public"."enum_manifesto_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__manifesto_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__manifesto_page_v_published_locale" AS ENUM('en', 'zh-CN', 'es', 'hi', 'ar', 'fr', 'pt', 'bn', 'ru', 'ur', 'id', 'sw', 'yo', 'ha');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_published_locale" AS ENUM('en', 'zh-CN', 'es', 'hi', 'ar', 'fr', 'pt', 'bn', 'ru', 'ur', 'id', 'sw', 'yo', 'ha');
  CREATE TYPE "public"."enum_green_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__green_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__green_page_v_published_locale" AS ENUM('en', 'zh-CN', 'es', 'hi', 'ar', 'fr', 'pt', 'bn', 'ru', 'ur', 'id', 'sw', 'yo', 'ha');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"ordering" numeric DEFAULT 0 NOT NULL,
  	"accent_color" varchar DEFAULT '#A8E6CF',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "product_categories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"public_name" varchar,
  	"category_id" integer,
  	"outbound_u_r_l" varchar,
  	"product_status" "enum_products_product_status" DEFAULT 'staging',
  	"is_flagship" boolean DEFAULT false,
  	"launch_date" timestamp(3) with time zone,
  	"icon_id" integer,
  	"ordering" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_locales" (
  	"tagline" varchar,
  	"short_description" varchar,
  	"long_description" jsonb,
  	"universal_reach_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_public_name" varchar,
  	"version_category_id" integer,
  	"version_outbound_u_r_l" varchar,
  	"version_product_status" "enum__products_v_version_product_status" DEFAULT 'staging',
  	"version_is_flagship" boolean DEFAULT false,
  	"version_launch_date" timestamp(3) with time zone,
  	"version_icon_id" integer,
  	"version_ordering" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_products_v_locales" (
  	"version_tagline" varchar,
  	"version_short_description" varchar,
  	"version_long_description" jsonb,
  	"version_universal_reach_note" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "commitment_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "commitment_items_locales" (
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "timeline_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"media_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "timeline_events_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" "enum_legal_pages_slug",
  	"title" varchar,
  	"body" jsonb,
  	"last_updated" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_legal_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_legal_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" "enum__legal_pages_v_version_slug",
  	"version_title" varchar,
  	"version_body" jsonb,
  	"version_last_updated" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__legal_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__legal_pages_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "contact_routes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" "enum_contact_routes_slug" NOT NULL,
  	"forward_to" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact_routes_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to" varchar NOT NULL,
  	"status_code" "enum_redirects_status_code" DEFAULT '301' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "release_notes_changes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_release_notes_changes_type" NOT NULL,
  	"entry" varchar NOT NULL
  );
  
  CREATE TABLE "release_notes_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"username" varchar NOT NULL
  );
  
  CREATE TABLE "release_notes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"version" varchar NOT NULL,
  	"release_date" timestamp(3) with time zone NOT NULL,
  	"git_tag" varchar NOT NULL,
  	"git_sha" varchar NOT NULL,
  	"status" "enum_release_notes_status" DEFAULT 'draft' NOT NULL,
  	"ordering" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "release_notes_locales" (
  	"title" varchar NOT NULL,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "roadmap_items_git_refs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ref" varchar NOT NULL
  );
  
  CREATE TABLE "roadmap_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_roadmap_items_category" NOT NULL,
  	"status" "enum_roadmap_items_status" DEFAULT 'planned' NOT NULL,
  	"target_quarter" varchar,
  	"shipped_at" timestamp(3) with time zone,
  	"ordering" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "roadmap_items_locales" (
  	"title" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"why_it_matters" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "journal_posts_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "journal_posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );
  
  CREATE TABLE "journal_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"author_id" integer NOT NULL,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"reading_time" numeric,
  	"cover_image_id" integer,
  	"status" "enum_journal_posts_status" DEFAULT 'draft' NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "journal_posts_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"body" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"product_categories_id" integer,
  	"products_id" integer,
  	"commitment_items_id" integer,
  	"timeline_events_id" integer,
  	"legal_pages_id" integer,
  	"contact_routes_id" integer,
  	"redirects_id" integer,
  	"release_notes_id" integer,
  	"roadmap_items_id" integer,
  	"journal_posts_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'Intelligent Singularity' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"studio_blurb" varchar NOT NULL,
  	"footer_sources" varchar,
  	"top_bar_status_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_content_locales" (
  	"hero_label" varchar NOT NULL,
  	"hero_tagline" varchar NOT NULL,
  	"hero_cta_primary" varchar NOT NULL,
  	"hero_cta_secondary" varchar NOT NULL,
  	"facts_title" varchar NOT NULL,
  	"facts_lead" varchar NOT NULL,
  	"flagships_title" varchar NOT NULL,
  	"flagships_lead" varchar NOT NULL,
  	"commitments_title" varchar NOT NULL,
  	"commitments_lead" varchar NOT NULL,
  	"see_all_portfolio_line" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "manifesto_page_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "manifesto_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_manifesto_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "manifesto_page_locales" (
  	"title" varchar,
  	"lead" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_manifesto_page_v_version_sources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_manifesto_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__manifesto_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__manifesto_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_manifesto_page_v_locales" (
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_locales" (
  	"title" varchar,
  	"lead" varchar,
  	"founder_story" jsonb,
  	"incorporation_context" varchar,
  	"lean_ops_philosophy" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__about_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_about_page_v_locales" (
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_founder_story" jsonb,
  	"version_incorporation_context" varchar,
  	"version_lean_ops_philosophy" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "green_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hosting_green_ratio" numeric DEFAULT 0.8,
  	"_status" "enum_green_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "green_page_locales" (
  	"title" varchar,
  	"lead" varchar,
  	"environmental_stance" jsonb,
  	"hosting_story" jsonb,
  	"future_generation_pledge" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_green_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hosting_green_ratio" numeric DEFAULT 0.8,
  	"version__status" "enum__green_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__green_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_green_page_v_locales" (
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_environmental_stance" jsonb,
  	"version_hosting_story" jsonb,
  	"version_future_generation_pledge" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_locales" (
  	"title" varchar NOT NULL,
  	"lead" varchar NOT NULL,
  	"privacy_note" varchar NOT NULL,
  	"success_message" varchar NOT NULL,
  	"error_message" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "itu_data" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"offline_count" numeric DEFAULT 2200000000 NOT NULL,
  	"online_percent" numeric DEFAULT 74 NOT NULL,
  	"offline_percent" numeric DEFAULT 26 NOT NULL,
  	"high_income_percent" numeric DEFAULT 94 NOT NULL,
  	"low_income_percent" numeric DEFAULT 23 NOT NULL,
  	"high_income5_g" numeric DEFAULT 84 NOT NULL,
  	"low_income5_g" numeric DEFAULT 4 NOT NULL,
  	"urban_percent" numeric DEFAULT 85 NOT NULL,
  	"rural_percent" numeric DEFAULT 58 NOT NULL,
  	"offline_in_low_middle_income_percent" numeric DEFAULT 96 NOT NULL,
  	"source_label" varchar DEFAULT 'ITU Facts and Figures 2025' NOT NULL,
  	"source_url" varchar DEFAULT 'https://www.itu.int/itu-d/reports/statistics/facts-figures-2025/' NOT NULL,
  	"last_verified" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "status_page_groups_monitor_ids" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "status_page_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "status_page_groups_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "status_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kuma_base_url" varchar DEFAULT 'https://status.intelligentsingularityinc.com' NOT NULL,
  	"kuma_slug" varchar DEFAULT 'is' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "status_page_locales" (
  	"eyebrow" varchar DEFAULT 'STATUS',
  	"title" varchar NOT NULL,
  	"lede" varchar NOT NULL,
  	"operational_copy" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "trust_page_pillars_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "trust_page_pillars_proof_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "trust_page_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "trust_page_pillars_locales" (
  	"heading" varchar NOT NULL,
  	"blurb" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "trust_page_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"issuer" varchar NOT NULL,
  	"issued_at" timestamp(3) with time zone NOT NULL,
  	"evidence_u_r_l" varchar NOT NULL
  );
  
  CREATE TABLE "trust_page_subprocessors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "trust_page_subprocessors_locales" (
  	"purpose" varchar NOT NULL,
  	"data_accessed" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "trust_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"last_reviewed_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "trust_page_locales" (
  	"eyebrow" varchar DEFAULT 'TRUST',
  	"title" varchar NOT NULL,
  	"lede" varchar NOT NULL,
  	"data_residency" jsonb,
  	"report_incident" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "help_page_routes_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"external" boolean DEFAULT false
  );
  
  CREATE TABLE "help_page_routes_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "help_page_routes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "help_page_routes_locales" (
  	"heading" varchar NOT NULL,
  	"blurb" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "help_page_popular_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "help_page_popular_questions_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "help_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"emergency_row_href" varchar NOT NULL,
  	"contact_fallback_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "help_page_locales" (
  	"eyebrow" varchar DEFAULT 'HELP',
  	"title" varchar NOT NULL,
  	"lede" varchar NOT NULL,
  	"emergency_row_heading" varchar NOT NULL,
  	"emergency_row_body" varchar NOT NULL,
  	"contact_fallback_heading" varchar NOT NULL,
  	"contact_fallback_body" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_categories_locales" ADD CONSTRAINT "product_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_category_id_product_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_icon_id_media_id_fk" FOREIGN KEY ("version_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "commitment_items_locales" ADD CONSTRAINT "commitment_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."commitment_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "timeline_events" ADD CONSTRAINT "timeline_events_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "timeline_events_locales" ADD CONSTRAINT "timeline_events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."timeline_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_legal_pages_v" ADD CONSTRAINT "_legal_pages_v_parent_id_legal_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_routes_locales" ADD CONSTRAINT "contact_routes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_routes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "release_notes_changes" ADD CONSTRAINT "release_notes_changes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."release_notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "release_notes_authors" ADD CONSTRAINT "release_notes_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."release_notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "release_notes_locales" ADD CONSTRAINT "release_notes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."release_notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roadmap_items_git_refs" ADD CONSTRAINT "roadmap_items_git_refs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."roadmap_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "roadmap_items_locales" ADD CONSTRAINT "roadmap_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."roadmap_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_posts_sources" ADD CONSTRAINT "journal_posts_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_posts_tags" ADD CONSTRAINT "journal_posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_posts" ADD CONSTRAINT "journal_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_posts" ADD CONSTRAINT "journal_posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_posts_locales" ADD CONSTRAINT "journal_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_commitment_items_fk" FOREIGN KEY ("commitment_items_id") REFERENCES "public"."commitment_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_timeline_events_fk" FOREIGN KEY ("timeline_events_id") REFERENCES "public"."timeline_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_routes_fk" FOREIGN KEY ("contact_routes_id") REFERENCES "public"."contact_routes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_release_notes_fk" FOREIGN KEY ("release_notes_id") REFERENCES "public"."release_notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roadmap_items_fk" FOREIGN KEY ("roadmap_items_id") REFERENCES "public"."roadmap_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_journal_posts_fk" FOREIGN KEY ("journal_posts_id") REFERENCES "public"."journal_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_content_locales" ADD CONSTRAINT "homepage_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "manifesto_page_sources" ADD CONSTRAINT "manifesto_page_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."manifesto_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "manifesto_page_locales" ADD CONSTRAINT "manifesto_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."manifesto_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_manifesto_page_v_version_sources" ADD CONSTRAINT "_manifesto_page_v_version_sources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_manifesto_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_manifesto_page_v_locales" ADD CONSTRAINT "_manifesto_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_manifesto_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_locales" ADD CONSTRAINT "about_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_locales" ADD CONSTRAINT "_about_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "green_page_locales" ADD CONSTRAINT "green_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."green_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_green_page_v_locales" ADD CONSTRAINT "_green_page_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_green_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "status_page_groups_monitor_ids" ADD CONSTRAINT "status_page_groups_monitor_ids_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."status_page_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "status_page_groups" ADD CONSTRAINT "status_page_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."status_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "status_page_groups_locales" ADD CONSTRAINT "status_page_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."status_page_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "status_page_locales" ADD CONSTRAINT "status_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."status_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trust_page_pillars_proof" ADD CONSTRAINT "trust_page_pillars_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_page_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trust_page_pillars_proof_locales" ADD CONSTRAINT "trust_page_pillars_proof_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_page_pillars_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trust_page_pillars" ADD CONSTRAINT "trust_page_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trust_page_pillars_locales" ADD CONSTRAINT "trust_page_pillars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_page_pillars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trust_page_certifications" ADD CONSTRAINT "trust_page_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trust_page_subprocessors" ADD CONSTRAINT "trust_page_subprocessors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trust_page_subprocessors_locales" ADD CONSTRAINT "trust_page_subprocessors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_page_subprocessors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trust_page_locales" ADD CONSTRAINT "trust_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trust_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "help_page_routes_links" ADD CONSTRAINT "help_page_routes_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."help_page_routes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "help_page_routes_links_locales" ADD CONSTRAINT "help_page_routes_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."help_page_routes_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "help_page_routes" ADD CONSTRAINT "help_page_routes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."help_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "help_page_routes_locales" ADD CONSTRAINT "help_page_routes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."help_page_routes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "help_page_popular_questions" ADD CONSTRAINT "help_page_popular_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."help_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "help_page_popular_questions_locales" ADD CONSTRAINT "help_page_popular_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."help_page_popular_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "help_page_locales" ADD CONSTRAINT "help_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."help_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "product_categories_locales_locale_parent_id_unique" ON "product_categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX "products_icon_idx" ON "products" USING btree ("icon_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_category_idx" ON "_products_v" USING btree ("version_category_id");
  CREATE INDEX "_products_v_version_version_icon_idx" ON "_products_v" USING btree ("version_icon_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "commitment_items_number_idx" ON "commitment_items" USING btree ("number");
  CREATE INDEX "commitment_items_updated_at_idx" ON "commitment_items" USING btree ("updated_at");
  CREATE INDEX "commitment_items_created_at_idx" ON "commitment_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "commitment_items_locales_locale_parent_id_unique" ON "commitment_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "timeline_events_media_idx" ON "timeline_events" USING btree ("media_id");
  CREATE INDEX "timeline_events_updated_at_idx" ON "timeline_events" USING btree ("updated_at");
  CREATE INDEX "timeline_events_created_at_idx" ON "timeline_events" USING btree ("created_at");
  CREATE UNIQUE INDEX "timeline_events_locales_locale_parent_id_unique" ON "timeline_events_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE INDEX "legal_pages__status_idx" ON "legal_pages" USING btree ("_status");
  CREATE INDEX "_legal_pages_v_parent_idx" ON "_legal_pages_v" USING btree ("parent_id");
  CREATE INDEX "_legal_pages_v_version_version_slug_idx" ON "_legal_pages_v" USING btree ("version_slug");
  CREATE INDEX "_legal_pages_v_version_version_updated_at_idx" ON "_legal_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_legal_pages_v_version_version_created_at_idx" ON "_legal_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_legal_pages_v_version_version__status_idx" ON "_legal_pages_v" USING btree ("version__status");
  CREATE INDEX "_legal_pages_v_created_at_idx" ON "_legal_pages_v" USING btree ("created_at");
  CREATE INDEX "_legal_pages_v_updated_at_idx" ON "_legal_pages_v" USING btree ("updated_at");
  CREATE INDEX "_legal_pages_v_snapshot_idx" ON "_legal_pages_v" USING btree ("snapshot");
  CREATE INDEX "_legal_pages_v_published_locale_idx" ON "_legal_pages_v" USING btree ("published_locale");
  CREATE INDEX "_legal_pages_v_latest_idx" ON "_legal_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "contact_routes_slug_idx" ON "contact_routes" USING btree ("slug");
  CREATE INDEX "contact_routes_updated_at_idx" ON "contact_routes" USING btree ("updated_at");
  CREATE INDEX "contact_routes_created_at_idx" ON "contact_routes" USING btree ("created_at");
  CREATE UNIQUE INDEX "contact_routes_locales_locale_parent_id_unique" ON "contact_routes_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "release_notes_changes_order_idx" ON "release_notes_changes" USING btree ("_order");
  CREATE INDEX "release_notes_changes_parent_id_idx" ON "release_notes_changes" USING btree ("_parent_id");
  CREATE INDEX "release_notes_changes_locale_idx" ON "release_notes_changes" USING btree ("_locale");
  CREATE INDEX "release_notes_authors_order_idx" ON "release_notes_authors" USING btree ("_order");
  CREATE INDEX "release_notes_authors_parent_id_idx" ON "release_notes_authors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "release_notes_slug_idx" ON "release_notes" USING btree ("slug");
  CREATE INDEX "release_notes_updated_at_idx" ON "release_notes" USING btree ("updated_at");
  CREATE INDEX "release_notes_created_at_idx" ON "release_notes" USING btree ("created_at");
  CREATE UNIQUE INDEX "release_notes_locales_locale_parent_id_unique" ON "release_notes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "roadmap_items_git_refs_order_idx" ON "roadmap_items_git_refs" USING btree ("_order");
  CREATE INDEX "roadmap_items_git_refs_parent_id_idx" ON "roadmap_items_git_refs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "roadmap_items_slug_idx" ON "roadmap_items" USING btree ("slug");
  CREATE INDEX "roadmap_items_updated_at_idx" ON "roadmap_items" USING btree ("updated_at");
  CREATE INDEX "roadmap_items_created_at_idx" ON "roadmap_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "roadmap_items_locales_locale_parent_id_unique" ON "roadmap_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "journal_posts_sources_order_idx" ON "journal_posts_sources" USING btree ("_order");
  CREATE INDEX "journal_posts_sources_parent_id_idx" ON "journal_posts_sources" USING btree ("_parent_id");
  CREATE INDEX "journal_posts_tags_order_idx" ON "journal_posts_tags" USING btree ("_order");
  CREATE INDEX "journal_posts_tags_parent_id_idx" ON "journal_posts_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "journal_posts_slug_idx" ON "journal_posts" USING btree ("slug");
  CREATE INDEX "journal_posts_author_idx" ON "journal_posts" USING btree ("author_id");
  CREATE INDEX "journal_posts_cover_image_idx" ON "journal_posts" USING btree ("cover_image_id");
  CREATE INDEX "journal_posts_created_at_idx" ON "journal_posts" USING btree ("created_at");
  CREATE UNIQUE INDEX "journal_posts_locales_locale_parent_id_unique" ON "journal_posts_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_commitment_items_id_idx" ON "payload_locked_documents_rels" USING btree ("commitment_items_id");
  CREATE INDEX "payload_locked_documents_rels_timeline_events_id_idx" ON "payload_locked_documents_rels" USING btree ("timeline_events_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_locked_documents_rels_contact_routes_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_routes_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_release_notes_id_idx" ON "payload_locked_documents_rels" USING btree ("release_notes_id");
  CREATE INDEX "payload_locked_documents_rels_roadmap_items_id_idx" ON "payload_locked_documents_rels" USING btree ("roadmap_items_id");
  CREATE INDEX "payload_locked_documents_rels_journal_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("journal_posts_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "homepage_content_locales_locale_parent_id_unique" ON "homepage_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "manifesto_page_sources_order_idx" ON "manifesto_page_sources" USING btree ("_order");
  CREATE INDEX "manifesto_page_sources_parent_id_idx" ON "manifesto_page_sources" USING btree ("_parent_id");
  CREATE INDEX "manifesto_page_sources_locale_idx" ON "manifesto_page_sources" USING btree ("_locale");
  CREATE INDEX "manifesto_page__status_idx" ON "manifesto_page" USING btree ("_status");
  CREATE UNIQUE INDEX "manifesto_page_locales_locale_parent_id_unique" ON "manifesto_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_manifesto_page_v_version_sources_order_idx" ON "_manifesto_page_v_version_sources" USING btree ("_order");
  CREATE INDEX "_manifesto_page_v_version_sources_parent_id_idx" ON "_manifesto_page_v_version_sources" USING btree ("_parent_id");
  CREATE INDEX "_manifesto_page_v_version_sources_locale_idx" ON "_manifesto_page_v_version_sources" USING btree ("_locale");
  CREATE INDEX "_manifesto_page_v_version_version__status_idx" ON "_manifesto_page_v" USING btree ("version__status");
  CREATE INDEX "_manifesto_page_v_created_at_idx" ON "_manifesto_page_v" USING btree ("created_at");
  CREATE INDEX "_manifesto_page_v_updated_at_idx" ON "_manifesto_page_v" USING btree ("updated_at");
  CREATE INDEX "_manifesto_page_v_snapshot_idx" ON "_manifesto_page_v" USING btree ("snapshot");
  CREATE INDEX "_manifesto_page_v_published_locale_idx" ON "_manifesto_page_v" USING btree ("published_locale");
  CREATE INDEX "_manifesto_page_v_latest_idx" ON "_manifesto_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_manifesto_page_v_locales_locale_parent_id_unique" ON "_manifesto_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE UNIQUE INDEX "about_page_locales_locale_parent_id_unique" ON "about_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_snapshot_idx" ON "_about_page_v" USING btree ("snapshot");
  CREATE INDEX "_about_page_v_published_locale_idx" ON "_about_page_v" USING btree ("published_locale");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_about_page_v_locales_locale_parent_id_unique" ON "_about_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "green_page__status_idx" ON "green_page" USING btree ("_status");
  CREATE UNIQUE INDEX "green_page_locales_locale_parent_id_unique" ON "green_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_green_page_v_version_version__status_idx" ON "_green_page_v" USING btree ("version__status");
  CREATE INDEX "_green_page_v_created_at_idx" ON "_green_page_v" USING btree ("created_at");
  CREATE INDEX "_green_page_v_updated_at_idx" ON "_green_page_v" USING btree ("updated_at");
  CREATE INDEX "_green_page_v_snapshot_idx" ON "_green_page_v" USING btree ("snapshot");
  CREATE INDEX "_green_page_v_published_locale_idx" ON "_green_page_v" USING btree ("published_locale");
  CREATE INDEX "_green_page_v_latest_idx" ON "_green_page_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_green_page_v_locales_locale_parent_id_unique" ON "_green_page_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "status_page_groups_monitor_ids_order_idx" ON "status_page_groups_monitor_ids" USING btree ("_order");
  CREATE INDEX "status_page_groups_monitor_ids_parent_id_idx" ON "status_page_groups_monitor_ids" USING btree ("_parent_id");
  CREATE INDEX "status_page_groups_order_idx" ON "status_page_groups" USING btree ("_order");
  CREATE INDEX "status_page_groups_parent_id_idx" ON "status_page_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "status_page_groups_locales_locale_parent_id_unique" ON "status_page_groups_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "status_page_locales_locale_parent_id_unique" ON "status_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trust_page_pillars_proof_order_idx" ON "trust_page_pillars_proof" USING btree ("_order");
  CREATE INDEX "trust_page_pillars_proof_parent_id_idx" ON "trust_page_pillars_proof" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "trust_page_pillars_proof_locales_locale_parent_id_unique" ON "trust_page_pillars_proof_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trust_page_pillars_order_idx" ON "trust_page_pillars" USING btree ("_order");
  CREATE INDEX "trust_page_pillars_parent_id_idx" ON "trust_page_pillars" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "trust_page_pillars_locales_locale_parent_id_unique" ON "trust_page_pillars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trust_page_certifications_order_idx" ON "trust_page_certifications" USING btree ("_order");
  CREATE INDEX "trust_page_certifications_parent_id_idx" ON "trust_page_certifications" USING btree ("_parent_id");
  CREATE INDEX "trust_page_subprocessors_order_idx" ON "trust_page_subprocessors" USING btree ("_order");
  CREATE INDEX "trust_page_subprocessors_parent_id_idx" ON "trust_page_subprocessors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "trust_page_subprocessors_locales_locale_parent_id_unique" ON "trust_page_subprocessors_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "trust_page_locales_locale_parent_id_unique" ON "trust_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "help_page_routes_links_order_idx" ON "help_page_routes_links" USING btree ("_order");
  CREATE INDEX "help_page_routes_links_parent_id_idx" ON "help_page_routes_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "help_page_routes_links_locales_locale_parent_id_unique" ON "help_page_routes_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "help_page_routes_order_idx" ON "help_page_routes" USING btree ("_order");
  CREATE INDEX "help_page_routes_parent_id_idx" ON "help_page_routes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "help_page_routes_locales_locale_parent_id_unique" ON "help_page_routes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "help_page_popular_questions_order_idx" ON "help_page_popular_questions" USING btree ("_order");
  CREATE INDEX "help_page_popular_questions_parent_id_idx" ON "help_page_popular_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "help_page_popular_questions_locales_locale_parent_id_unique" ON "help_page_popular_questions_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "help_page_locales_locale_parent_id_unique" ON "help_page_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "product_categories_locales" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "commitment_items" CASCADE;
  DROP TABLE "commitment_items_locales" CASCADE;
  DROP TABLE "timeline_events" CASCADE;
  DROP TABLE "timeline_events_locales" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "_legal_pages_v" CASCADE;
  DROP TABLE "contact_routes" CASCADE;
  DROP TABLE "contact_routes_locales" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "release_notes_changes" CASCADE;
  DROP TABLE "release_notes_authors" CASCADE;
  DROP TABLE "release_notes" CASCADE;
  DROP TABLE "release_notes_locales" CASCADE;
  DROP TABLE "roadmap_items_git_refs" CASCADE;
  DROP TABLE "roadmap_items" CASCADE;
  DROP TABLE "roadmap_items_locales" CASCADE;
  DROP TABLE "journal_posts_sources" CASCADE;
  DROP TABLE "journal_posts_tags" CASCADE;
  DROP TABLE "journal_posts" CASCADE;
  DROP TABLE "journal_posts_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "homepage_content" CASCADE;
  DROP TABLE "homepage_content_locales" CASCADE;
  DROP TABLE "manifesto_page_sources" CASCADE;
  DROP TABLE "manifesto_page" CASCADE;
  DROP TABLE "manifesto_page_locales" CASCADE;
  DROP TABLE "_manifesto_page_v_version_sources" CASCADE;
  DROP TABLE "_manifesto_page_v" CASCADE;
  DROP TABLE "_manifesto_page_v_locales" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "about_page_locales" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "_about_page_v_locales" CASCADE;
  DROP TABLE "green_page" CASCADE;
  DROP TABLE "green_page_locales" CASCADE;
  DROP TABLE "_green_page_v" CASCADE;
  DROP TABLE "_green_page_v_locales" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TABLE "itu_data" CASCADE;
  DROP TABLE "status_page_groups_monitor_ids" CASCADE;
  DROP TABLE "status_page_groups" CASCADE;
  DROP TABLE "status_page_groups_locales" CASCADE;
  DROP TABLE "status_page" CASCADE;
  DROP TABLE "status_page_locales" CASCADE;
  DROP TABLE "trust_page_pillars_proof" CASCADE;
  DROP TABLE "trust_page_pillars_proof_locales" CASCADE;
  DROP TABLE "trust_page_pillars" CASCADE;
  DROP TABLE "trust_page_pillars_locales" CASCADE;
  DROP TABLE "trust_page_certifications" CASCADE;
  DROP TABLE "trust_page_subprocessors" CASCADE;
  DROP TABLE "trust_page_subprocessors_locales" CASCADE;
  DROP TABLE "trust_page" CASCADE;
  DROP TABLE "trust_page_locales" CASCADE;
  DROP TABLE "help_page_routes_links" CASCADE;
  DROP TABLE "help_page_routes_links_locales" CASCADE;
  DROP TABLE "help_page_routes" CASCADE;
  DROP TABLE "help_page_routes_locales" CASCADE;
  DROP TABLE "help_page_popular_questions" CASCADE;
  DROP TABLE "help_page_popular_questions_locales" CASCADE;
  DROP TABLE "help_page" CASCADE;
  DROP TABLE "help_page_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_products_product_status";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_product_status";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_legal_pages_slug";
  DROP TYPE "public"."enum_legal_pages_status";
  DROP TYPE "public"."enum__legal_pages_v_version_slug";
  DROP TYPE "public"."enum__legal_pages_v_version_status";
  DROP TYPE "public"."enum__legal_pages_v_published_locale";
  DROP TYPE "public"."enum_contact_routes_slug";
  DROP TYPE "public"."enum_redirects_status_code";
  DROP TYPE "public"."enum_release_notes_changes_type";
  DROP TYPE "public"."enum_release_notes_status";
  DROP TYPE "public"."enum_roadmap_items_category";
  DROP TYPE "public"."enum_roadmap_items_status";
  DROP TYPE "public"."enum_journal_posts_status";
  DROP TYPE "public"."enum_manifesto_page_status";
  DROP TYPE "public"."enum__manifesto_page_v_version_status";
  DROP TYPE "public"."enum__manifesto_page_v_published_locale";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum__about_page_v_published_locale";
  DROP TYPE "public"."enum_green_page_status";
  DROP TYPE "public"."enum__green_page_v_version_status";
  DROP TYPE "public"."enum__green_page_v_published_locale";`)
}
