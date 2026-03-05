import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Status, Task } from "./task.entity";

@Injectable()
export class TaskService {
	constructor(
		@InjectRepository(Task) private taskRepository: Repository<Task>,
	) {}

	async createDefaultTasksForBoard(boardId: number) {
		const defaultTasks = [
			{
				name: "Task in Progress",
				status: Status.INPROGRESS,
				icon: "timer",
				board: { id: boardId },
			},
			{
				name: "Task Completed",
				icon: "power",
				status: Status.COMPLETED,
				board: { id: boardId },
			},
			{
				name: "Task Won't Do",
				icon: "coffee",
				status: Status.WONTDO,
				board: { id: boardId },
			},
			{
				name: "Task To Do",
				description:
					"Work on a Challenge on devChallenges.io, learn Typescript",
				icon: "book",
				status: Status.TODO,
				board: { id: boardId },
			},
		];
		const tasks = defaultTasks.map((data) => this.taskRepository.create(data));
		return this.taskRepository.save(tasks);
	}
}
