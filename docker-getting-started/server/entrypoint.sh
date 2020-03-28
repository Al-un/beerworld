#!/bin/sh

# By default, Docker entrypoint are expected to be shell scripts hence the 
# "#/bin/sh" shebang. For bash scripts or other scripting, the ENTRYPOINT
# must call the appropriate binary

# Exit the script if one command fails
set -e

# At this stage, a Node.js environment is assumed so "npx" command is
# available.
# Also, script execution context is expected to be at the WORKDIR 
# defined in the Dockerfile
npx sequelize-cli db:create
npx sequelize-cli db:migrate 
npx sequelize-cli db:seed:all

exec "$@"