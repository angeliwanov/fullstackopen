#Start Docker
docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres

#Check running containers
docker ps

#Enter psql container
docker exec -it <CONTAINER_NAME> psql -U postgres postgres
