#!/bin/bash

# ~ Important Information

#Required Parameters:
# -h Database Host
# -u Database User
# -p Database Password
# -s Database Schema
# -t Container Version Tag

getRandomJwtSecret()
{
    jwt_secret=`cat /dev/urandom | tr -dc '[:alpha:]' | fold -w ${1:-100} | head -n 1`
}

db_port=3306;
db_host=nutritia.com.br;
run_migrations=true;

getRandomJwtSecret
while getopts u:p:s:t: flag
do
    case "${flag}" in
        u) db_user=${OPTARG};;
        p) db_password=${OPTARG};;
        s) db_schema=${OPTARG};;
        t) target_folder=${OPTARG};;
    esac
done

echo "Entering Dist Folder..."
cd $target_folder
echo $PWD;
echo;

echo "Defining Environment Variables..."
echo NODE_ENV=production > .env
echo JWT_SECRET=$jwt_secret >> .env
echo DATABASE_HOST=$db_host >> .env
echo DATABASE_PORT=$db_port >> .env
echo DATABASE_USER=$db_user >> .env
echo DATABASE_PASSWORD=$db_password >> .env
echo DATABASE_SCHEMA=$db_schema >> .env
echo RUN_MIGRATIONS=$run_migrations >> .env

echo "Renewing Docker Compose Workload..."
docker stop $(docker ps -a -q)
docker images -a | grep "^apinutritia*" | awk '{print $3}' | xargs docker rmi -f
docker compose -f compose.prod.yml down
docker compose -f compose.prod.yml up --detach
exit 0
