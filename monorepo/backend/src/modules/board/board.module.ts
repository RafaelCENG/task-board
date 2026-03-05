import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskModule } from "../task/task.module";
import { BoardController } from "./board.controller";
import { Board } from "./board.entity";
import { BoardService } from "./board.service";

@Module({
	imports: [TypeOrmModule.forFeature([Board]), TaskModule],
	providers: [BoardService],
	controllers: [BoardController],
	exports: [BoardService],
})
export class BoardModule {}
