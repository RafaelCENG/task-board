import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Auth } from "../../services/auth";
import { Board } from "../../services/board";
import { Boards } from "../boards/boards";
@Component({
	selector: "app-home",
	imports: [Boards],
	templateUrl: "./home.html",
	styleUrl: "./home.scss",
})
export class Home {
	private auth = inject(Auth);
	private router = inject(Router);
	private board = inject(Board);

	private activatedRoute = inject(ActivatedRoute);
	boardId = signal("");

	userId = JSON.parse(localStorage.getItem("user") || "null");

	onLogout() {
		this.auth.logout().subscribe(() => {
			this.router.navigate(["/login"]);
		});
	}

	onCreateNewBoard() {
		this.board.createNewBoard(this.userId).subscribe((newBoard) => {
			this.router.navigate([`/home/board/${newBoard.id}`]);
		});
	}

	constructor() {
		// Access route parameters
		this.activatedRoute.params.subscribe((params) => {
			this.boardId.set(params["id"]);
		});
	}
}
