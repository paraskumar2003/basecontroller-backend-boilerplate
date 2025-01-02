import { DataSource } from "typeorm";
import { AppDataSource } from "./dataSource";

let connection: DataSource | null = null;

export const initialize = async () => {
    try {
        if (connection && connection.isInitialized) {
            console.log("Database connection already established.");
            return connection;
        }

        connection = await AppDataSource.initialize();
        console.log("MySQL connected successfully", `${connection.options.database}`);

        return connection;
    } catch (err) {
        console.log("Error while connecting to database:", err.message);
        return null;
    }
};
