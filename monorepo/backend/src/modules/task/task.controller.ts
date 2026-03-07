import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { Status } from "./task.entity";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post("/new/:boardId")
	createNewTask(@Param("boardId") boardId: string) {
		return this.taskService.createNewTask(Number(boardId));
	}

	@Put("/update")
	updateTask(
		@Body()
		body: {
			taskId: number;
			name: string;
			description: string;
			status: Status;
			icon: string;
		},
	) {
		return this.taskService.updateTask(
			body.taskId,
			body.name,
			body.description,
			body.status,
			body.icon,
		);
	}

	@Delete("/delete/:taskId")
	deleteTask(@Param("taskId") taskId: string) {
		return this.taskService.deleteTask(Number(taskId));
	}
}
