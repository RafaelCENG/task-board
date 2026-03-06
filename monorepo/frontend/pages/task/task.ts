import { Component, Input } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	heroBookOpen,
	heroCheckBadge,
	heroClock,
	heroDocumentCheck,
	heroForward,
	heroMoon,
	heroXCircle,
} from "@ng-icons/heroicons/outline";
export type TaskType = {
	id: number;
	name: string;
	description: string;
	status: string;
	icon: string;
};

@Component({
	selector: "app-task",
	imports: [NgIcon],
	viewProviders: [
		provideIcons({
			heroBookOpen,
			heroClock,
			heroMoon,
			heroDocumentCheck,
			heroCheckBadge,
			heroXCircle,
			heroForward,
		}),
	],
	templateUrl: "./task.html",
	styleUrl: "./task.scss",
})
export class Task {
	@Input() task: TaskType = {} as TaskType;
}
