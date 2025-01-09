## The way to run application.

1. MySQL

```bash
$ MYSQL_ROOT_PASSWORD=[your-password] MYSQL_DATABASE=[your-database] docker-compose up
```

2. Update DATABASE_URL env in .env

3. Run migrate database

```shell
$ npx prisma migrate dev
```
4. Start BE server

```shell
$ yarn dev
```

## Test
```bash
# Create resource
$ curl --location 'http://localhost:3000/v1/users' \
--header 'Authorization: Bearer YourToken' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "hah@gmail.com",
    "fullname": "fullname"
}'

# Update resource
$ curl --location --request PUT 'http://localhost:3000/v1/users/1' \
--header 'Authorization: Bearer YourToken' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "huhu@Gmail.com",
    "fullname": "update fullname"
}'

# Delete resource
$ curl --location --request DELETE 'http://localhost:3000/v1/users/1' \
--header 'Authorization: Bearer YourToken'

# Get details of a resource.
$ curl --location 'http://localhost:3000/v1/users/1' \
--header 'Authorization: Bearer YourToken'

# List resources with basic filters.
$ curl --location 'http://localhost:3000/v1/users?keyword=search-key&page=1&limit=10' \
--header 'Authorization: Bearer YourToken'
```