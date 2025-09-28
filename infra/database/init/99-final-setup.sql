-- Description : 99-final-setup.sql - 모든 초기화 및 마이그레이션 이후 실행되는 최종 스크립트
-- Author : Shiwoo Min
-- Date : 2025-09-27
-- Version : 2.0 (개선된 버전)

-- 시퀀스 값 초기화 (seed 데이터와 충돌 방지)
DO $$
BEGIN
    RAISE NOTICE '시퀀스 초기화 중...';

    PERFORM setval('users_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM users), 1000), false);
    PERFORM setval('auth_providers_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM auth_providers), 1000), false);
    PERFORM setval('venues_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM venues), 100), false);
    PERFORM setval('rooms_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM rooms), 100), false);
    PERFORM setval('programs_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM programs), 100), false);
    PERFORM setval('sessions_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM sessions), 100), false);
    PERFORM setval('room_reservations_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM room_reservations), 100), false);
    PERFORM setval('program_participants_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM program_participants), 100), false);
    PERFORM setval('devices_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM devices), 100), false);
    PERFORM setval('device_rentals_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM device_rentals), 100), false);
    PERFORM setval('ai_interactions_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM ai_interactions), 100), false);
    PERFORM setval('user_activities_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM user_activities), 100), false);
    PERFORM setval('reviews_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM reviews), 100), false);
    PERFORM setval('notifications_id_seq', GREATEST((SELECT COALESCE(MAX(id), 0) FROM notifications), 100), false);

    RAISE NOTICE '시퀀스 초기화 완료';
END$$;

-- 통계 업데이트 (쿼리 최적화용)
DO $$
BEGIN
    RAISE NOTICE '테이블 통계 업데이트 중...';

    ANALYZE users;
    ANALYZE auth_providers;
    ANALYZE venues;
    ANALYZE rooms;
    ANALYZE programs;
    ANALYZE sessions;
    ANALYZE room_reservations;
    ANALYZE program_participants;
    ANALYZE devices;
    ANALYZE device_rentals;
    ANALYZE ai_interactions;
    ANALYZE user_activities;
    ANALYZE reviews;
    ANALYZE notifications;

    RAISE NOTICE '통계 업데이트 완료';
END$$;

-- 필수 인덱스 생성 (성능 최적화)
DO $$
BEGIN
    RAISE NOTICE '인덱스 생성 중...';

    -- Users/Auth 인덱스
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_role_flags ON users(role_flags);
    CREATE INDEX IF NOT EXISTS idx_users_last_login_at ON users(last_login_at);
    CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);
    CREATE INDEX IF NOT EXISTS idx_auth_providers_user_id ON auth_providers(user_id);
    CREATE INDEX IF NOT EXISTS idx_auth_providers_provider_sub
        ON auth_providers(provider, provider_sub) WHERE provider_sub IS NOT NULL;

    -- Programs/Sessions 인덱스
    CREATE INDEX IF NOT EXISTS idx_programs_created_by ON programs(created_by_user_id);
    CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category) WHERE category IS NOT NULL;
    CREATE INDEX IF NOT EXISTS idx_sessions_program_id ON sessions(program_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_starts_at ON sessions(starts_at);
    CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);

    -- Venues/Rooms 인덱스
    CREATE INDEX IF NOT EXISTS idx_rooms_venue_id ON rooms(venue_id);
    CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);

    -- Reservations 인덱스
    CREATE INDEX IF NOT EXISTS idx_room_reservations_room_id ON room_reservations(room_id);
    CREATE INDEX IF NOT EXISTS idx_room_reservations_user_id ON room_reservations(user_id);
    CREATE INDEX IF NOT EXISTS idx_room_reservations_period ON room_reservations USING gist(period);
    CREATE INDEX IF NOT EXISTS idx_room_reservations_status ON room_reservations(status);

    -- Participants 인덱스
    CREATE INDEX IF NOT EXISTS idx_program_participants_session_id ON program_participants(session_id);
    CREATE INDEX IF NOT EXISTS idx_program_participants_user_id ON program_participants(user_id);
    CREATE INDEX IF NOT EXISTS idx_program_participants_status ON program_participants(status);

    -- Devices 인덱스
    CREATE INDEX IF NOT EXISTS idx_devices_type ON devices(type) WHERE type IS NOT NULL;
    CREATE INDEX IF NOT EXISTS idx_devices_status ON devices(status);
    CREATE INDEX IF NOT EXISTS idx_device_rentals_user_id ON device_rentals(user_id);
    CREATE INDEX IF NOT EXISTS idx_device_rentals_device_id ON device_rentals(device_id);
    CREATE INDEX IF NOT EXISTS idx_device_rentals_status ON device_rentals(status);
    CREATE INDEX IF NOT EXISTS idx_device_rentals_starts_at ON device_rentals(starts_at);

    -- AI/Logs/Reviews 인덱스
    CREATE INDEX IF NOT EXISTS idx_ai_interactions_user ON ai_interactions(user_id);
    CREATE INDEX IF NOT EXISTS idx_ai_interactions_created_at ON ai_interactions(created_at);
    CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
    CREATE INDEX IF NOT EXISTS idx_user_activities_created_at ON user_activities(created_at);
    CREATE INDEX IF NOT EXISTS idx_user_activities_action ON user_activities(action);
    CREATE INDEX IF NOT EXISTS idx_reviews_target ON reviews(target_type, target_id);
    CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
    CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

    -- Notifications 인덱스
    CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id) WHERE is_read = false;
    CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
    CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

    RAISE NOTICE '인덱스 생성 완료';
END$$;

-- 앱 전용 계정(app_user) 생성 및 권한 부여
DO $$
DECLARE
    app_password TEXT;
    db_name TEXT;
BEGIN
    RAISE NOTICE '애플리케이션 계정 설정 중...';

    SELECT current_database() INTO db_name;

    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_user') THEN
        app_password := COALESCE(
            current_setting('app.database_password', true),
            encode(gen_random_bytes(16), 'hex')
        );

        EXECUTE format('CREATE ROLE app_user LOGIN PASSWORD %L', app_password);
        EXECUTE format('GRANT CONNECT ON DATABASE %I TO app_user', db_name);
        GRANT USAGE ON SCHEMA public TO app_user;
        GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
        GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
        ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
        ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_user;
        RAISE NOTICE 'Application role "app_user" 생성 완료';
        RAISE NOTICE '패스워드: %', app_password;
    ELSE
        RAISE NOTICE 'Application role "app_user" 이미 존재함';
    END IF;
END$$;

-- 추가 제약조건 및 검증 설정
DO $$
BEGIN
    RAISE NOTICE '추가 제약조건 설정 중...';

    BEGIN
        ALTER TABLE users ADD CONSTRAINT chk_users_email_format
        CHECK (email IS NULL OR email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
        RAISE NOTICE '이메일 형식 제약조건 추가';
    EXCEPTION
        WHEN duplicate_object THEN
            RAISE NOTICE '이메일 형식 제약조건 이미 존재';
    END;

    BEGIN
        ALTER TABLE rooms ADD CONSTRAINT chk_rooms_capacity_positive
        CHECK (capacity IS NULL OR capacity > 0);
        RAISE NOTICE '방 용량 제약조건 추가';
    EXCEPTION
        WHEN duplicate_object THEN
            RAISE NOTICE '방 용량 제약조건 이미 존재';
    END;

    BEGIN
        ALTER TABLE sessions ADD CONSTRAINT chk_sessions_fee_non_negative
        CHECK (participant_fee IS NULL OR participant_fee >= 0);
        RAISE NOTICE '참가비 제약조건 추가';
    EXCEPTION
        WHEN duplicate_object THEN
            RAISE NOTICE '참가비 제약조건 이미 존재';
    END;

    RAISE NOTICE '제약조건 설정 완료';
END$$;

-- 뷰 생성 (자주 사용되는 쿼리 최적화)
DO $$
BEGIN
    RAISE NOTICE '편의 뷰 생성 중...';

    CREATE OR REPLACE VIEW v_active_sessions AS
    SELECT
        s.*,
        p.title as program_title,
        p.category as program_category,
        u.name as creator_name,
        r.name as room_name,
        v.name as venue_name
    FROM sessions s
    JOIN programs p ON s.program_id = p.id
    LEFT JOIN users u ON p.created_by_user_id = u.id
    LEFT JOIN room_reservations rr ON s.room_reservation_id = rr.id
    LEFT JOIN rooms r ON rr.room_id = r.id
    LEFT JOIN venues v ON r.venue_id = v.id
    WHERE s.status IN ('SCHEDULED', 'CONFIRMED');

    CREATE OR REPLACE VIEW v_user_stats AS
    SELECT
        u.id,
        u.name,
        u.email,
        u.role_flags,
        COUNT(DISTINCT pp.session_id) as sessions_attended,
        COUNT(DISTINCT p.id) as programs_created,
        COUNT(DISTINCT dr.id) as devices_rented,
        COALESCE(AVG(r.rating), 0) as avg_rating_received
    FROM users u
    LEFT JOIN program_participants pp ON u.id = pp.user_id AND pp.status = 'CONFIRMED'
    LEFT JOIN programs p ON u.id = p.created_by_user_id
    LEFT JOIN device_rentals dr ON u.id = dr.user_id AND dr.status IN ('APPROVED', 'RETURNED')
    LEFT JOIN reviews r ON r.target_type = 'program' AND r.target_id = p.id
    GROUP BY u.id, u.name, u.email, u.role_flags;

    RAISE NOTICE '편의 뷰 생성 완료';
END$$;

-- 최종 검증 및 상태 확인
DO $$
DECLARE
    table_count INTEGER;
    index_count INTEGER;
    constraint_count INTEGER;
    view_count INTEGER;
    role_exists BOOLEAN;
BEGIN
    RAISE NOTICE '최종 검증 중...';

    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

    SELECT COUNT(*) INTO index_count
    FROM pg_indexes
    WHERE schemaname = 'public';

    SELECT COUNT(*) INTO constraint_count
    FROM information_schema.table_constraints
    WHERE table_schema = 'public';

    SELECT COUNT(*) INTO view_count
    FROM information_schema.views
    WHERE table_schema = 'public';

    SELECT EXISTS(SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_user') INTO role_exists;

    IF table_count < 14 THEN
        RAISE WARNING '테이블 개수가 예상보다 적습니다: % (예상: 14개)', table_count;
    END IF;

    IF NOT role_exists THEN
        RAISE WARNING 'app_user 계정이 생성되지 않았습니다';
    END IF;

    RAISE NOTICE '========================================';
    RAISE NOTICE 'ConnectWon Database 초기화 완료!';
    RAISE NOTICE '데이터베이스: %', current_database();
    RAISE NOTICE '테이블 개수: %개', table_count;
    RAISE NOTICE '인덱스 개수: %개', index_count;
    RAISE NOTICE '제약조건 개수: %개', constraint_count;
    RAISE NOTICE '뷰 개수: %개', view_count;
    RAISE NOTICE '애플리케이션 계정: % 설정됨', CASE WHEN role_exists THEN 'app_user' ELSE '실패' END;
    RAISE NOTICE '시퀀스: 충돌 방지를 위해 조정됨';
    RAISE NOTICE '통계: 쿼리 최적화를 위해 업데이트됨';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'ConnectWon 크리에이터 플랫폼 준비 완료!';
    RAISE NOTICE '========================================';
END$$;
