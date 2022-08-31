import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "user",
    password: process.env.DB_PASS || "passuser",
    database: process.env.DB_NAME || "db",
    synchronize: true,
    logging: true,
    entities: ["dist/entity/**/*.js"],
    subscribers: [],
    migrations: ["migrations/*.ts"],
    migrationsTableName: "custom_migration_table"
})