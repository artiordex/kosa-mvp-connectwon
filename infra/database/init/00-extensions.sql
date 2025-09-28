-- Description : 00-extensions.sql - 📌 PostgreSQL 초기화 시 가장 먼저 실행되는 스크립트
-- Author : Shiwoo Min
-- Date : 2025-09-07

-- 필수 확장 (ESSENTIAL EXTENSIONS)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";   -- UUID 생성 함수
CREATE EXTENSION IF NOT EXISTS "citext";      -- 대소문자 구분 없는 문자열 타입
CREATE EXTENSION IF NOT EXISTS "btree_gist";  -- GiST 인덱스 (시간/범위 겹침 제약 조건용)

-- 선택 확장 (OPTIONAL EXTENSIONS)
CREATE EXTENSION IF NOT EXISTS "unaccent";    -- 악센트 제거 (café = cafe)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";     -- Trigram 유사도 (퍼지 검색/자동완성)

-- 최소 검증 (MINIMAL VERIFICATION)
DO $$
DECLARE
    missing TEXT := '';
BEGIN
    FOR ext IN SELECT unnest(ARRAY['uuid-ossp','citext','btree_gist'])
    LOOP
        IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = ext) THEN
            missing := missing || ext || ', ';
        END IF;
    END LOOP;

    IF missing <> '' THEN
        RAISE EXCEPTION '필수 확장 누락: %', rtrim(missing, ', ');
    ELSE
        RAISE NOTICE '필수 확장이 모두 설치됨';
    END IF;
END$$;

-- 완료 로그 (COMPLETION LOG)
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE '확장 설치 완료';
    RAISE NOTICE '필수 : uuid-ossp, citext, btree_gist';
    RAISE NOTICE '선택 : unaccent, pg_trgm';
    RAISE NOTICE '========================================';
END$$;
