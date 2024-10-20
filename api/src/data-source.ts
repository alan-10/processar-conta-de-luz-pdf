import { DataSource } from 'typeorm';
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "myuser",
    password: "mypassword123",
    database: "mydatabase_invoice",
    synchronize: true,
    logging: true,
    entities:["src/entities/*.ts"],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
       console.log("conceted in database");
       
    })
    .catch((error) => console.log("Error conecting database", error))