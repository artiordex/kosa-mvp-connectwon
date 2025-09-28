-- Description : 30-seed.sql - 📌 ConnectWon 개발/테스트용 Seed Data
-- Author : Shiwoo Min
-- Date : 2025-09-27

-- USERS (Admin, Creator, 일반 유저)
INSERT INTO users (id, email, name, role_flags) VALUES
  (1, 'admin@connectwon.com', 'Admin User', 0),  -- Admin
  (2, 'creator@connectwon.com', 'Creator User', 2), -- Creator
  (3, 'member@connectwon.com', 'Member User', 1);  -- 일반 사용자

-- AUTH_PROVIDERS (local 로그인)
INSERT INTO auth_providers (user_id, provider, provider_sub, password_hash) VALUES
  (1, 'local', NULL, '$argon2id$v=19$m=65536,t=3,p=4$dummyhashAdmin'),
  (2, 'local', NULL, '$argon2id$v=19$m=65536,t=3,p=4$dummyhashCreator'),
  (3, 'google', 'sub-member', '');

-- VENUES (지점 3개: 광명, 강남, 마포)
INSERT INTO venues (id, name, address, opening_hours, blackout_rules) VALUES
  (1, '광명 Branch', 'Gwangmyeong, Korea', '{"mon-fri":"09:00-18:00"}', '{}'),
  (2, '강남 Branch', 'Gangnam, Seoul', '{"mon-fri":"09:00-18:00"}', '{}'),
  (3, '마포 Branch', 'Mapo, Seoul', '{"mon-fri":"09:00-18:00"}', '{}');

-- ROOMS (광명점 샘플)
INSERT INTO rooms (id, venue_id, name, capacity, status) VALUES
  (1, 1, '회의실 1', 10, 'ACTIVE'),
  (2, 1, '회의실 2', 15, 'ACTIVE'),
  (3, 1, '회의실 3', 12, 'ACTIVE'),
  (4, 1, '커뮤니티 라운지', 40, 'ACTIVE'),
  (5, 1, 'SW 개발실', 29, 'ACTIVE'),
  (6, 1, '릴렉스존', 9, 'ACTIVE'),
  (7, 1, '폰부스 1', 1, 'ACTIVE'),
  (8, 1, '폰부스 2', 1, 'ACTIVE'),
  (9, 1, '입주기업공간', 20, 'INACTIVE');

-- PROGRAMS (회사 운영 vs 크리에이터 운영)
INSERT INTO programs (id, created_by_user_id, title, description, category) VALUES
  (1, 1, 'AI 창업 특강', 'ConnectWon 주관: 스타트업 창업자를 위한 AI 트렌드 강연', 'SEMINAR'),
  (2, 2, '디자인 스프린트 워크숍', 'Creator 주관: 3일간 집중 디자인 스프린트 실습', 'WORKSHOP');

-- SESSIONS (광명점 예약 공간 활용)
INSERT INTO sessions (id, program_id, starts_at, ends_at, capacity, status, location_text) VALUES
  (1, 1, '2025-10-02 10:00:00+09', '2025-10-02 12:00:00+09', 40, 'SCHEDULED', '광명점 커뮤니티 라운지'),
  (2, 2, '2025-10-03 14:00:00+09', '2025-10-03 17:00:00+09', 15, 'SCHEDULED', '광명점 회의실 2');

-- ROOM_RESERVATIONS (세션과 매핑)
INSERT INTO room_reservations (id, room_id, user_id, starts_at, ends_at, purpose, status) VALUES
  (1, 4, 1, '2025-10-02 10:00:00+09', '2025-10-02 12:00:00+09', 'AI 창업 특강 진행', 'CONFIRMED'),
  (2, 2, 2, '2025-10-03 14:00:00+09', '2025-10-03 17:00:00+09', '디자인 스프린트 워크숍', 'CONFIRMED');

-- 세션과 예약 1:1 연결
UPDATE sessions SET room_reservation_id = 1 WHERE id = 1;
UPDATE sessions SET room_reservation_id = 2 WHERE id = 2;
UPDATE room_reservations SET session_id = 1 WHERE id = 1;
UPDATE room_reservations SET session_id = 2 WHERE id = 2;

-- PROGRAM_PARTICIPANTS (참가자)
INSERT INTO program_participants (session_id, user_id, role, status) VALUES
  (1, 2, 'ATTENDEE', 'CONFIRMED'), -- Creator가 Admin 세션 참가
  (2, 3, 'ATTENDEE', 'CONFIRMED'); -- Member가 Creator 세션 참가

-- DEVICES (광명점만)
INSERT INTO devices (id, name, type, specs, status) VALUES
  (1, '갤럭시 Z폴드6', 'MOBILE', '{"manufacturer":"Samsung","os":"Android","network":"Cellular+Wi-Fi"}', 'AVAILABLE'),
  (2, '아이패드 프로 11(M4)', 'TABLET', '{"manufacturer":"Apple","os":"iPadOS","network":"Wi-Fi"}', 'AVAILABLE'),
  (3, '아이폰 16 프로', 'MOBILE', '{"manufacturer":"Apple","os":"iOS","network":"Cellular+Wi-Fi"}', 'AVAILABLE'),
  (4, '아이폰 16 프로맥스', 'MOBILE', '{"manufacturer":"Apple","os":"iOS","network":"Cellular+Wi-Fi"}', 'AVAILABLE'),
  (5, '맥북 프로 16"', 'LAPTOP', '{"manufacturer":"Apple","cpu":"M3 Pro","ram":"32GB"}', 'AVAILABLE'),
  (6, '고성능 워크스테이션', 'PC', '{"cpu":"Intel Xeon","gpu":"RTX 4090","ram":"128GB"}', 'AVAILABLE'),
  (7, 'iMac 24"', 'IMAC', '{"cpu":"M3","ram":"16GB"}', 'AVAILABLE'),
  (8, 'GPU 서버 A', 'SERVER', '{"gpu":"A100","ram":"256GB"}', 'AVAILABLE');

-- DEVICE_RENTALS (샘플 대여)
INSERT INTO device_rentals (id, device_id, user_id, starts_at, ends_at, status) VALUES
  (1, 1, 3, '2025-10-01 09:00:00+09', '2025-10-01 18:00:00+09', 'APPROVED');

-- AI_INTERACTIONS (샘플 로그)
INSERT INTO ai_interactions (user_id, program_id, session_id, provider, model, kind, prompt_tokens, completion_tokens, cost, status) VALUES
  (3, 2, 2, 'OpenAI', 'gpt-4', 'recommendation', 150, 300, 0.0050, 'OK');

-- REVIEWS (샘플 리뷰)
INSERT INTO reviews (user_id, target_type, target_id, rating, comment) VALUES
  (3, 'program', 2, 5, '정말 유익한 워크숍이었습니다!');

-- NOTIFICATIONS (샘플 알림)
INSERT INTO notifications (user_id, type, title, message) VALUES
  (3, 'reservation', '회의실 예약 확정', '디자인 스프린트 워크숍 예약이 확정되었습니다.');

-- 완료 로그
DO $$
BEGIN
    RAISE NOTICE 'Seed data inserted successfully (MVP Config, 광명점 중심)';
END$$;
