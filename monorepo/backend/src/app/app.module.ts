import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "../config/database.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
			isGlobal: true,
		}),
		TypeOrmModule.forRoot(dataSourceOptions),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
