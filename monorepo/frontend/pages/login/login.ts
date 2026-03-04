import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Auth } from "../../services/auth";

// interface LoginData {
// 	email: string;
// 	password: string;
// }

@Component({
	selector: "app-login",
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: "./login.html",
	styleUrl: "./login.scss",
})

// This is the new way of doing forms by using signals. Only on Angular 21 experimental

// export class Login {
// 	private auth = inject(Auth);
// 	loginModel = signal<LoginData>({
// 		email: "",
// 		password: "",
// 	});

// 	loginForm = form(this.loginModel, (schemaPath) => {
// 		required(schemaPath.email);
// 		required(schemaPath.password);
// 	});

// 	onSubmit(event: Event) {
// 		event.preventDefault();
// 		submit(this.loginForm, async () => {
// 			const credentials = this.loginModel();
// 			this.auth.login(credentials);
// 		});
// 	}
// }
export class Login {
	form: FormGroup;
	isLoading = false;
	errorMessage: string | null = null;
	private fb = inject(FormBuilder);
	private auth = inject(Auth);
	private router = inject(Router);
	constructor() {
		this.form = this.fb.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required, Validators.minLength(6)]],
		});
	}

	onSubmit() {
		if (this.form.invalid) return;

		this.isLoading = true;
		this.errorMessage = null;

		this.auth.login(this.form.value).subscribe({
			next: () => {
				this.isLoading = false;
				this.router.navigate(["/home"]);
			},
			error: (err) => {
				this.isLoading = false;
				this.errorMessage =
					err.error?.message || "Login failed. Please try again.";
			},
		});
	}
}
