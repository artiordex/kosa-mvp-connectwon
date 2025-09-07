-- Description : 00-extensions.sql - 📌 PostgreSQL Extensions Installation
-- Author      : Shiwoo Min
-- Date        : 2025-09-07
-- NOTE: This file runs FIRST in alphabetical order during PostgreSQL initialization

-- Enable UUID generation functions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable case-insensitive text type (used for email fields)
CREATE EXTENSION IF NOT EXISTS "citext";

-- Enable GiST indexing for exclusion constraints (used for room reservation overlaps)
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- Enable additional text search capabilities (optional)
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Enable trigram similarity matching (optional, for fuzzy search)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Log extension installation
DO $$
BEGIN
    RAISE NOTICE 'PostgreSQL extensions installed successfully';
END$$;
