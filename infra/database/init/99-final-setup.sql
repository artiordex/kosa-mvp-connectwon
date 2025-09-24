-- Description : 99-final-setup.sql - 📌 모든 초기화 작업 이후 실행되는 최종 스크립트
-- Author : Shiwoo Min
-- Date : 2025-09-24

-- 시퀀스 값 초기화 (seed 데이터와 충돌 방지)
SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM users), false);
SELECT setval('venues_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM venues), false);
SELECT setval('rooms_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM rooms), false);
SELECT setval('programs_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM programs), false);
SELECT setval('sessions_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM sessions), false);
SELECT setval('room_reservations_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM room_reservations), false);
SELECT setval('program_participants_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM program_participants), false);
SELECT setval('ai_interactions_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM ai_interactions), false);

-- auth_providers 테이블이 있으면 시퀀스 조정
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'auth_providers') THEN
        PERFORM setval('auth_providers_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM auth_providers), false);
        RAISE NOTICE 'auth_providers sequence adjusted';
    END IF;
END$$;

-- 통계 업데이트 (쿼리 최적화용)
ANALYZE users;
ANALYZE venues;
ANALYZE rooms;
ANALYZE programs;
ANALYZE sessions;
ANALYZE room_reservations;
ANALYZE program_participants;
ANALYZE ai_interactions;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'auth_providers') THEN
        ANALYZE auth_providers;
    END IF;
END$$;

-- 필수 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_last_login_at ON users(last_login_at);
CREATE INDEX IF NOT EXISTS idx_room_reservations_room_id ON room_reservations(room_id);
CREATE INDEX IF NOT EXISTS idx_room_reservations_user_id ON room_reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_room_reservations_timerange ON room_reservations USING GIST(period);
CREATE INDEX IF NOT EXISTS idx_sessions_program_id ON sessions(program_id);
CREATE INDEX IF NOT EXISTS idx_program_participants_session_id ON program_participants(session_id);
CREATE INDEX IF NOT EXISTS idx_program_participants_user_id ON program_participants(user_id);

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'auth_providers') THEN
        CREATE INDEX IF NOT EXISTS idx_auth_providers_user_id ON auth_providers(user_id);
        CREATE INDEX IF NOT EXISTS idx_auth_providers_provider_sub
          ON auth_providers(provider, provider_sub) WHERE provider_sub IS NOT NULL;
    END IF;
END$$;

-- 앱 전용 계정(app_user) 생성 및 권한 부여
DO $$
DECLARE
    app_password TEXT;
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_user') THEN
        app_password := COALESCE(
            current_setting('app.database_password', true),
            encode(gen_random_bytes(16), 'hex')
        );

        EXECUTE format('CREATE ROLE app_user LOGIN PASSWORD %L', app_password);

        GRANT CONNECT ON DATABASE connectwon_db TO app_user;
        GRANT USAGE ON SCHEMA public TO app_user;

        GRANT SELECT, INSERT, UPDATE ON users TO app_user;
        GRANT SELECT ON venues TO app_user;
        GRANT SELECT ON rooms TO app_user;
        GRANT SELECT, INSERT, UPDATE ON programs TO app_user;
        GRANT SELECT, INSERT, UPDATE, DELETE ON sessions TO app_user;
        GRANT SELECT, INSERT, UPDATE, DELETE ON room_reservations TO app_user;
        GRANT SELECT, INSERT, UPDATE, DELETE ON program_participants TO app_user;
        GRANT SELECT, INSERT, UPDATE ON ai_interactions TO app_user;

        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'auth_providers') THEN
            GRANT SELECT, INSERT, UPDATE, DELETE ON auth_providers TO app_user;
        END IF;

        GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

        RAISE NOTICE 'Application role "app_user" created';
    ELSE
        RAISE NOTICE 'Application role "app_user" already exists';
    END IF;
END$$;

-- 추가 제약조건 설정
DO $$
BEGIN
    -- 이메일 형식 체크
    IF NOT EXISTS (SELECT 1 FROM information_schema.check_constraints
                   WHERE constraint_name = 'chk_users_email_format') THEN
        ALTER TABLE users ADD CONSTRAINT chk_users_email_format
        CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
        RAISE NOTICE 'Email format constraint added';
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Some constraints may already exist: %', SQLERRM;
END$$;

-- 최종 검증
DO $$
DECLARE
    table_count INTEGER;
    constraint_count INTEGER;
    extension_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

    IF table_count = 0 THEN
        RAISE EXCEPTION 'No tables found in public schema!';
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'room_reservations') THEN
        SELECT COUNT(*) INTO constraint_count
        FROM pg_constraint
        WHERE conname = 'room_reservations_no_overlap';

        IF constraint_count = 0 THEN
            RAISE WARNING 'room_reservations_no_overlap constraint missing';
        END IF;
    END IF;

    SELECT COUNT(*) INTO extension_count FROM pg_extension WHERE extname = 'citext';
    IF extension_count = 0 THEN
        RAISE EXCEPTION 'Extension citext missing!';
    END IF;

    SELECT COUNT(*) INTO extension_count FROM pg_extension WHERE extname = 'btree_gist';
    IF extension_count = 0 THEN
        RAISE WARNING 'Extension btree_gist missing!';
    END IF;

    RAISE NOTICE 'Database validation OK - % tables verified', table_count;
END$$;

-- 완료 로그
DO $$
DECLARE
    table_count INTEGER;
    index_count INTEGER;
    extension_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO table_count FROM information_schema.tables WHERE table_schema = 'public';
    SELECT COUNT(*) INTO index_count FROM pg_indexes WHERE schemaname = 'public';
    SELECT COUNT(*) INTO extension_count FROM pg_extension;

    RAISE NOTICE '========================================';
    RAISE NOTICE 'ConnectWon 데이터베이스 초기화 완료!';
    RAISE NOTICE '데이터베이스: %', current_database();
    RAISE NOTICE '테이블 개수: % 생성됨', table_count;
    RAISE NOTICE '인덱스 개수: % 생성됨', index_count;
    RAISE NOTICE '확장 모듈 개수: % 설치됨', extension_count;
    RAISE NOTICE '애플리케이션 계정: app_user 설정됨';
    RAISE NOTICE '시퀀스: 충돌 방지를 위해 조정됨';
    RAISE NOTICE '애플리케이션 연결 준비 완료';
    RAISE NOTICE '========================================';
END$$;
