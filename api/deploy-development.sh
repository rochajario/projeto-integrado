#/bin/bash
exitFn()
{
    echo "Shutting down Development Database"
    docker compose -f compose.dev.yml down
    exit 0
}

trap exitFn SIGINT

echo "Initializing Development Database"
docker compose -f compose.dev.yml up --detach

echo "Initializing Api Service"
NODE_ENV=development nest start --watch

