-- Description : 99-final-setup.sql - 📌 Final Database Configuration
-- Author      : Shiwoo Min
-- Date        : 2025-09-07
-- NOTE: Final setup tasks that run after all other initialization

------------------------------------------------------------
-- ================ SEQUENCE ADJUSTMENTS =================
------------------------------------------------------------
-- Reset sequences to avoid conflicts with seeded data
SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 1) FROM users));
SELECT setval('venues_id_seq', (SELECT COALESCE(MAX(id), 1) FROM venues));
SELECT setval('rooms_id_seq', (SELECT COALESCE(MAX(id), 1) FROM rooms));
SELECT setval('programs_id_seq', (SELECT COALESCE(MAX(id), 1) FROM programs));
SELECT setval('sessions_id_seq', (SELECT COALESCE(MAX(id), 1) FROM sessions));
SELECT setval('room_reservations_id_seq', (SELECT COALESCE(MAX(id), 1) FROM room_reservations));
SELECT setval('program_participants_id_seq', (SELECT COALESCE(MAX(id), 1) FROM program_participants));
SELECT setval('ai_interactions_id_seq', (SELECT COALESCE(MAX(id), 1) FROM ai_interactions));

------------------------------------------------------------
-- ================ PERFORMANCE OPTIMIZATIONS =================
------------------------------------------------------------
-- Update table statistics for better query planning
ANALYZE users;
ANALYZE venues;
ANALYZE rooms;
ANALYZE programs;
ANALYZE sessions;
ANALYZE room_reservations;
ANALYZE program_participants;
ANALYZE ai_interactions;

------------------------------------------------------------
-- ================ ADDITIONAL CONSTRAINTS =================
------------------------------------------------------------
-- Add any additional constraints that depend on seeded data
-- (None required for this schema)

------------------------------------------------------------
-- ================ DATABASE ROLES & PERMISSIONS =================
------------------------------------------------------------
-- Create application role (if needed)
-- Note: This might be handled outside of init scripts in production
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_user') THEN
        CREATE ROLE app_user LOGIN PASSWORD 'change_me_in_production';
        GRANT CONNECT ON DATABASE connectwon_db TO app_user;
        GRANT USAGE ON SCHEMA public TO app_user;
        GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
        GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

        RAISE NOTICE 'Application role "app_user" created with basic permissions';
    ELSE
        RAISE NOTICE 'Application role "app_user" already exists';
    END IF;
END$$;

------------------------------------------------------------
-- ================ FINAL VALIDATION =================
------------------------------------------------------------
-- Verify critical constraints are working
DO $$
DECLARE
    constraint_count INTEGER;
BEGIN
    -- Check that exclusion constraint exists for room reservations
    SELECT COUNT(*) INTO constraint_count
    FROM pg_constraint
    WHERE conname = 'room_reservations_no_overlap';

    IF constraint_count = 0 THEN
        RAISE EXCEPTION 'Critical constraint room_reservations_no_overlap not found!';
    END IF;

    -- Verify extensions are installed
    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'citext') THEN
        RAISE EXCEPTION 'Required extension citext not installed!';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'btree_gist') THEN
        RAISE EXCEPTION 'Required extension btree_gist not installed!';
    END IF;

    RAISE NOTICE 'Database validation completed successfully';
END$$;

------------------------------------------------------------
-- ================ COMPLETION LOG =================
------------------------------------------------------------
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE 'ConnectWon Database Initialization Complete!';
    RAISE NOTICE 'Database: connectwon_db';
    RAISE NOTICE 'Tables: % created', (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public');
    RAISE NOTICE 'Extensions: citext, btree_gist, uuid-ossp installed';
    RAISE NOTICE 'Seed data: Test users, venues, and sessions loaded';
    RAISE NOTICE 'Ready for application connections';
    RAISE NOTICE '========================================';
END$$;
