#!/bin/sh

# By default, Docker entrypoint are expected to be shell scripts hence the 
# "#/bin/sh" shebang. For bash scripts or other scripting, the ENTRYPOINT
# must call the appropriate binary

# Exit the script if one command fails
set -e

# https://stackoverflow.com/a/307735/4906586
HAS_DATABASE_URL="${DATABASE_URL:-DATABASE_URL not defined}"
# At this stage, a Node.js environment is assumed so "npx" command is
# available.
# Also, script execution context is expected to be at the WORKDIR 
# defined in the Dockerfile
if [ "$HAS_DATABASE_URL" != "DATABASE_URL not defined" ]; then
    # When using Docker Network, the database image already spawn a DB
    # npx sequelize-cli db:create

    npx sequelize-cli db:migrate 
    npx sequelize-cli db:seed:all
else
    echo "Skipping database initialisation, DATABASE_URL not found"
fi

exec "$@"