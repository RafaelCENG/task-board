import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "../src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class Auth {
	private http = inject(HttpClient);

	login(data: {
		email: string;
		password: string;
	}): Observable<{
		accessToken: string;
		refreshToken: string;
		userId: string;
	}> {
		return this.http
			.post<{ accessToken: string; refreshToken: string; userId: string }>(
				`${environment.apiUrl}/auth/signin`,
				data,
			)
			.pipe(
				tap((tokens) => {
					localStorage.setItem("accessToken", tokens.accessToken);
					localStorage.setItem("refreshToken", tokens.refreshToken);
					localStorage.setItem("user", JSON.stringify(tokens.userId));
				}),
				catchError((error) => {
					const errorMessage =
						error.status === 401
							? "Invalid email or password"
							: "An error occurred. Please try again.";
					return throwError(() => new Error(errorMessage));
				}),
			);
	}

	register(data: { email: string; password: string }): Observable<any> {
		return this.http.post(`${environment.apiUrl}/auth/signup`, data).pipe(
			catchError((error) => {
				const errorMessage =
					error.status === 400
						? "Email already in use"
						: "An error occurred. Please try again.";
				return throwError(() => new Error(errorMessage));
			}),
		);
	}

	refresh(): Observable<{ accessToken: string; refreshToken: string }> {
		const refreshToken = localStorage.getItem("refreshToken");
		return this.http
			.get<{ accessToken: string; refreshToken: string }>(
				`${environment.apiUrl}/auth/refresh`,
				{
					headers: new HttpHeaders({ Authorization: `Bearer ${refreshToken}` }),
				},
			)
			.pipe(
				tap((tokens) => {
					localStorage.setItem("accessToken", tokens.accessToken);
					localStorage.setItem("refreshToken", tokens.refreshToken);
				}),
				catchError(() => {
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");
					return throwError(
						() => new Error("Session expired. Please log in again."),
					);
				}),
			);
	}

	logout(): Observable<unknown> {
		const token = localStorage.getItem("accessToken");
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		return this.http.get(`${environment.apiUrl}/auth/logout`, {
			headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
		});
	}

	getToken(): string | null {
		return localStorage.getItem("accessToken");
	}

	isAuthenticated(): boolean {
		return !!this.getToken();
	}
}
