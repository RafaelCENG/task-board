import {
	Component,
	computed,
	effect,
	Input,
	inject,
	resource,
} from "@angular/core";
import { Board } from "../../services/board";

@Component({
	selector: "app-boards",
	templateUrl: "./boards.html",
	styleUrl: "./boards.scss",
})
export class Boards {
	@Input() userId = "";
	private boardService = inject(Board);

	boardsResource = resource({
		params: () => ({ id: this.userId }),
		loader: (params) => this.boardService.getAllBoards(params.params.id),
		defaultValue: [],
	});

	boards = computed(() => this.boardsResource.value());
	defaultBoard = computed(() => this.boards().find((board) => board.isDefault));

	constructor() {
		effect(() => {
			console.log("Boards loaded:", this.boards());
		});
	}
}
