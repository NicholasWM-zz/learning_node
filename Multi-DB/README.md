docker run /
    --name postgres /
    -e POSTGRES_USER=nicholaswm /
    -e POSTGRES_PASSWORD=senhasecreta /
    -e POSTGRES_DB=heroes /
    -p 5432:5432 /
    -d /
    postgres

docker run --name postgres -e POSTGRES_USER=nicholaswm -e POSTGRES_PASSWORD=senhasecreta -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

docker ps
docker exec -it postgres /bin/bash

docker run /
    --name adminer /
    -p 8080:8080 /
    --link postgres:postgres /
    -d /
    adminer

docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer


# ---- Mongo DB

docker run /
    --name mongodb_ew /
    -p 27017:27017 /
    -e MONGO_INITDB_ROOT_USERNAME=admin /
    -e MONGO_INITDB_ROOT_PASSWORD=admin /
    -d /
    mongo:4

docker run --name mongodb_ew -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -d mongo:4


docker run /
    --name mongoclient /
    -p 3000:3000 /
    --link mongodb_ew:mongodb_ew /
    -d /
    mongoclient/mongoclient


docker run --name mongoclient -p 3000:3000 --link mongodb_ew:mongodb_ew -d mongoclient/mongoclient

docker exec -it mongodb_ew /
    mongo --host localhost -u admin -p admin --authenticationDatabase admin /
    --eval "db.getSiblingDB('herois').createUser({user: 'nicholaswm', pwd: 'minhasenhasecreta', roles:[{role:'readWrite', db:'herois'}]})"


docker exec -it mongodb_ew mongo --host localhost -u admin -p admin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'nicholaswm', pwd: 'minhasenhasecreta', roles:[{role:'readWrite', db:'herois'}]})"