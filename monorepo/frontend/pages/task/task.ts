import { Component, Input } from "@angular/core";

export type TaskType = {
	id: number;
	name: string;
	description: string;
	status: string;
	icon: string;
};

@Component({
	selector: "app-task",
	imports: [],
	templateUrl: "./task.html",
	styleUrl: "./task.scss",
})
export class Task {
	@Input() task: TaskType = {} as TaskType;
}
