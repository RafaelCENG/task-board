import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Auth } from "../../services/auth";
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
	userId = JSON.parse(localStorage.getItem("user") || "null");

	onLogout() {
		this.auth.logout().subscribe(() => {
			this.router.navigate(["/login"]);
		});
	}
}
