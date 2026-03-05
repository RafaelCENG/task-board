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

@Component({
	selector: "app-register",
	templateUrl: "./register.html",
	styleUrls: ["./register.scss"],
	imports: [ReactiveFormsModule, CommonModule],
})
export class Register {
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

		this.auth.register(this.form.value).subscribe({
			next: () => {
				this.isLoading = false;
				this.router.navigate(["/login"]);
			},
			error: (err) => {
				this.isLoading = false;
				this.errorMessage =
					err.error?.message || "Registration failed. Please try again.";
			},
		});
	}
}
