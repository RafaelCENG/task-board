import { Controller, Param, Post } from "@nestjs/common";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post("/new/:boardId")
	createNewTask(@Param("boardId") boardId: string) {
		return this.taskService.createNewTask(Number(boardId));
	}
}
