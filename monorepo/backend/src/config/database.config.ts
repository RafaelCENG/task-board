import * as dotenv from "dotenv";
import { resolve } from "path";
import { DataSource, type DataSourceOptions } from "typeorm";
import type { SeederOptions } from "typeorm-extension";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

dotenv.config({ path: resolve(process.cwd(), ".env") });

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
	type: "postgres",
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: Number(process.env.DB_PORT ?? 5432),
	host: process.env.DB_HOST,
	entities: [
		"backend/src/**/*.entity{.ts,.js}",
		"dist/backend/**/*.entity{.ts,.js}",
	],
	migrations: [
		"backend/src/database/migrations/*{.ts,.js}",
		"dist/backend/database/migrations/*{.ts,.js}",
	],
	seeds: [
		"backend/src/database/seeds/*{.ts,.js}",
		"dist/backend/database/seeds/*{.ts,.js}",
	],
	factories: [
		"backend/src/database/factories/**/*{.ts,.js}",
		"dist/backend/database/factories/**/*{.ts,.js}",
	],
	seedTracking: false,
	synchronize: process.env.DB_SYNCHRONIZE === "true", // Disable on production
	logging: process.env.NODE_ENV === "development",
	namingStrategy: new SnakeNamingStrategy(),
	cache: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
