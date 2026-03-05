import {
	Component,
	computed,
	effect,
	inject,
	resource,
	signal,
} from "@angular/core";
import { Router } from "@angular/router";
import { Auth } from "../../services/auth";
import { Board } from "../../services/board";

@Component({
	selector: "app-home",
	imports: [],
	templateUrl: "./home.html",
	styleUrl: "./home.scss",
})
export class Home {
	private auth = inject(Auth);
	private router = inject(Router);
	private boardService = inject(Board);

	userId = JSON.parse(localStorage.getItem("user") || "null");
	boardsResource = resource({
		params: () => ({ id: this.userId }),
		loader: (params) => this.boardService.getAllBoards(params.params.id),
		defaultValue: [],
	});

	boards = computed(() => this.boardsResource.value());

	onLogout() {
		this.auth.logout().subscribe(() => {
			this.router.navigate(["/login"]);
		});
	}

	constructor() {
		effect(() => {
			console.log("Boards loaded:", this.boards());
		});
	}
}
