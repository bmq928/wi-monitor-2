# wi-monitor-2

For monitoring server

# run in devlopment

- run influxdb (docker or real)
- npm run seed:dev
- npm run dev

# run in production

- create docker container: npm run container:create

# code structure explaination

- apply dependency injection style
- parameterize function

- src/index.js
  - the place to assign service for function
  - call a connect function of server (to create express app) and database (connect to database )

- src/server.js
  - expose start function which return a Promise that return express app
  - the place to use middleware

- src/database.js
  - expose connect function that except database config return a db object that contain some model (influxdb, mysql) to
query to that db

- src/influxDB
  - expose connect function that return influxDB model

- monitorApi
  - return an object contain {
    + schema: influx schema for creating schema in influxdb,
    + createContinousQuery: continous query for creating continous query in influxdb,
    + createApi: this take app (express app) and db (model) as parameter to create api
  }

# app flow
- index.js
  - connect to database and create a db model from src/database.js
  - create an express app by start function in src/server.js
  - pass db and app to module to accept api
  - start server