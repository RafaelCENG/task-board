import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskService } from "../task/task.service";
import { Board } from "./board.entity";

@Injectable()
export class BoardService {
	constructor(
		@InjectRepository(Board) private boardModel: Repository<Board>,
		private taskService: TaskService,
	) {}

	async createDefaultBoardForUser(userId: string) {
		const createdBoard = this.boardModel.create({
			name: "My Task Board",
			description: "Tasks to keep organized",
			user: { id: userId },
		});
		const savedBoard = await this.boardModel.save(createdBoard);
		await this.taskService.createDefaultTasksForBoard(savedBoard.id);
		return savedBoard;
	}
}
