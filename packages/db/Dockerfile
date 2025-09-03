FROM postgres:17
ENV TZ=Asia/Seoul

# 초기 데이터 및 설정 파일 복사
COPY init/ /docker-entrypoint-initdb.d/
COPY conf/postgresql.conf /etc/postgresql/postgresql.conf
COPY conf/pg_hba.conf /etc/postgresql/pg_hba.conf
