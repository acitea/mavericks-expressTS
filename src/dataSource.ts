import { DataSource } from "typeorm"

export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "mav",
    password: "mav123",
    database: "postgres",
    // synchronize: true,
    logging: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    subscribers: [],
    migrations: [],
})