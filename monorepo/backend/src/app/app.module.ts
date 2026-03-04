import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "../config/database.config";
import { AuthModule } from "../modules/auth/auth.module";
import { Board } from "../modules/board/board.entity";
import { BoardModule } from "../modules/board/board.module";
import { Task } from "../modules/task/task.entity";
import { TaskModule } from "../modules/task/task.module";
import { User } from "../modules/users/user.entity";
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
			entities: [User, Board, Task],
			migrations: [],
			autoLoadEntities: true,
		}),
		AuthModule,
		UsersModule,
		BoardModule,
		TaskModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
