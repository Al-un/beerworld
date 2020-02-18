# PostgreSQL

## Creating an user

References:

- [PostgreSQL `CREATE USER` documentation](https://www.postgresql.org/docs/12/sql-createuser.html)
- [_Peer authentication failed for XXX_ StackOverflow answer](https://stackoverflow.com/a/18664239/4906586)
- [Another _Peer authentication failed_ post in dba.stackexchange](https://dba.stackexchange.com/a/131130/126621)

To avoid using `postgres` user in my server applications, I prefer to create a dedicated user which can create database. Having such permission is quite useful when using ORM which can create missing databases :)

First, let's connect to the `postgres` database as `postgres`:

```sh
# Switch to postgres user
sudo su - postgres
# Run psql which defaults to postgres database in this case
psql
```

For some reason, I often name local user `padawan`:

```sql
-- Although LOGIN is already assigned by default when using CREATE USER,
-- I added it for the sake of having both CREATE USER and CREATE ROLE using
-- the same syntax
CREATE USER padawan WITH LOGIN CREATEDB PASSWORD 'some-jedi-level-password-here';
-- To delete the user freshly created
DROP USER padawan;
```

If as a non-postgres user there is an error _Peer authentication failed for user "XXX"_ when trying:

```sh
psql -U padawan -W
```

Then, check your `pg_hba.conf`:

```sh
# I am using PostgreSQL 11 here. Make sure you have the correct version
# in your pg_hba.conf path
sudo vim /etc/postgresql/11/main/pg_hba.conf
```

Change

```
local   all             all                                     peer
```

into

```
local   all             all                                     md5
```

Once the change is done, restart PostgreSQL service

```sh
sudo service postgresql restart
```

_Warning_: Don't touch the line

```
local   all             postgres                                peer
```

Changing the line shown above will require a password for the `postgres` user which will prevent you from login as `postgres` user. Fortunately, if you have changed `peer` into `md5` for the `postgres` user, you can revert the change.
