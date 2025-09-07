-- Description : 30-seed.sql - 📌 PostgreSQL Table Dummy Data Insertion
-- Author      : Shiwoo Min
-- Date        : 2025-09-07
-- NOTE: Dummy data for initial development/testing

------------------------------------------------------------
-- USERS
------------------------------------------------------------
INSERT INTO users (id, email, name, google_sub, role_flags) VALUES
  (1, 'alice@example.com', 'Alice', 'sub-alice', 0),
  (2, 'bob@example.com',   'Bob',   'sub-bob',   0);

------------------------------------------------------------
-- VENUES
------------------------------------------------------------
INSERT INTO venues (id, name, address, opening_hours, blackout_rules) VALUES
  (1, 'Gangnam Branch', 'Seoul, Korea', '{"mon-fri":"09:00-18:00"}', '{}'),
  (2, 'Hongdae Branch', 'Seoul, Korea', '{"mon-sun":"10:00-22:00"}', '{}');

------------------------------------------------------------
-- ROOMS
------------------------------------------------------------
INSERT INTO rooms (id, venue_id, name, capacity, status) VALUES
  (1, 1, 'Conference Room A', 20, 'ACTIVE'),
  (2, 1, 'Conference Room B', 10, 'ACTIVE'),
  (3, 2, 'Studio Room',       15, 'ACTIVE');

------------------------------------------------------------
-- PROGRAMS
------------------------------------------------------------
INSERT INTO programs (id, created_by_user_id, type, title, description) VALUES
  (1, 1, 'SEMINAR', 'AI Startup Talk', 'Introduction to AI entrepreneurship'),
  (2, 2, 'WORKSHOP', 'Design Sprint', 'Hands-on design sprint workshop');

------------------------------------------------------------
-- SESSIONS
------------------------------------------------------------
INSERT INTO sessions (id, program_id, starts_at, ends_at, capacity, status, location_text) VALUES
  (1, 1, '2025-09-10 10:00:00+09', '2025-09-10 12:00:00+09', 20, 'SCHEDULED', 'Gangnam Branch - Room A'),
  (2, 2, '2025-09-11 14:00:00+09', '2025-09-11 17:00:00+09', 15, 'SCHEDULED', 'Hongdae Branch - Studio Room');

------------------------------------------------------------
-- ROOM_RESERVATIONS
------------------------------------------------------------
INSERT INTO room_reservations (id, room_id, user_id, starts_at, ends_at, purpose, status) VALUES
  (1, 1, 1, '2025-09-10 10:00:00+09', '2025-09-10 12:00:00+09', 'Seminar Reservation', 'CONFIRMED'),
  (2, 3, 2, '2025-09-11 14:00:00+09', '2025-09-11 17:00:00+09', 'Workshop Reservation', 'CONFIRMED');

-- Link session <-> reservation (양방향 1:1)
UPDATE sessions SET room_reservation_id = 1 WHERE id = 1;
UPDATE sessions SET room_reservation_id = 2 WHERE id = 2;
UPDATE room_reservations SET session_id = 1 WHERE id = 1;
UPDATE room_reservations SET session_id = 2 WHERE id = 2;

------------------------------------------------------------
-- PROGRAM_PARTICIPANTS
------------------------------------------------------------
INSERT INTO program_participants (session_id, user_id, role, status) VALUES
  (1, 2, 'ATTENDEE', 'CONFIRMED'),
  (2, 1, 'HOST',     'CONFIRMED');

------------------------------------------------------------
-- AI_INTERACTIONS
------------------------------------------------------------
INSERT INTO ai_interactions (user_id, program_id, session_id, provider, model, kind, prompt_tokens, completion_tokens, cost, status) VALUES
  (1, 1, 1, 'OpenAI', 'gpt-4', 'chat', 100, 200, 0.0025, 'OK'),
  (2, 2, 2, 'Anthropic', 'claude-3', 'chat', 120, 180, 0.0030, 'OK');

-- Log seed data completion
DO $$
BEGIN
    RAISE NOTICE 'Seed data inserted successfully';
END$$;
