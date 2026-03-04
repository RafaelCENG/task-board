import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardController } from "./board.controller";
import { Board } from "./board.entity";
import { BoardService } from "./board.service";

@Module({
	imports: [TypeOrmModule.forFeature([Board])],
	providers: [BoardService],
	controllers: [BoardController],
})
export class BoardModule {}
