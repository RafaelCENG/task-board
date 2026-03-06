import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskService } from "../task/task.service";
import { Board } from "./board.entity";
import { DefaultBoardDto } from "./dto/default-board-dto";

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
			isDefault: true,
			user: { id: userId },
		});
		const savedBoard = await this.boardModel.save(createdBoard);
		await this.taskService.createDefaultTasksForBoard(savedBoard.id);
		return savedBoard;
	}

	async findAll(user_id: string): Promise<Board[] | null> {
		return await this.boardModel.find({
			where: { user: { id: user_id } },
			relations: { tasks: true },
		});
	}

	async findOne(id: string): Promise<Board | null> {
		return await this.boardModel.findOne({
			where: { id: Number(id) },
			relations: { tasks: true },
		});
	}

	async createNewBoard(userId: string) {
		const createdBoard = this.boardModel.create({
			name: "New Board",
			description: "New Empty Board",
			user: { id: userId },
		});
		const savedBoard = await this.boardModel.save(createdBoard);
		await this.taskService.createDefaultTasksForBoard(savedBoard.id);
		return savedBoard;
	}

	async renameBoard(
		boardId: string,
		name: string,
		description?: string,
	): Promise<string> {
		await this.boardModel.update(
			{ id: Number(boardId) },
			{ name, description },
		);
		return "Board renamed successfully";
	}

	async defaultBoard(defaultBoardDto: DefaultBoardDto): Promise<string> {
		// First we need to find the current default board and set it to false.
		await this.boardModel
			.findOne({
				where: { user: { id: defaultBoardDto.userId }, isDefault: true },
			})
			.then((defaultBoard) => {
				if (defaultBoard) {
					this.boardModel.update({ id: defaultBoard.id }, { isDefault: false });
				}
			});

		await this.boardModel.update(
			{
				id: Number(defaultBoardDto.boardId),
				user: { id: defaultBoardDto.userId },
			},
			{ isDefault: true },
		);
		return "Default board updated successfully";
	}
}
