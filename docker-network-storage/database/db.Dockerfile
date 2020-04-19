# Environment variable inherited from postgres image: https://hub.docker.com/_/postgres?tab=description
# ENV POSTGRES_USER
# ENV POSTGRES_PASSWORD
# ENV POSTGRES_DB
FROM postgres:12-alpine

EXPOSE 5432
