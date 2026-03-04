import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "../config/database.config";
import { AuthModule } from "../modules/auth/auth.module";
import { UsersModule } from "../modules/users/users.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			...dataSourceOptions,
			entities: [],
			migrations: [],
			autoLoadEntities: true,
		}),
		AuthModule,
		UsersModule,
	],

	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
