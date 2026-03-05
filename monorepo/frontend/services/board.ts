import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "../src/environments/environment";

export type BoardType = {
	id: number;
	title: string;
	description: string;
	user_id: string;
};

@Injectable({
	providedIn: "root",
})
export class Board {
	private http = inject(HttpClient);

	login(data: {
		email: string;
		password: string;
	}): Observable<{ accessToken: string; refreshToken: string }> {
		return this.http
			.post<{ accessToken: string; refreshToken: string }>(
				`${environment.apiUrl}/auth/signin`,
				data,
			)
			.pipe(
				tap((tokens) => {
					localStorage.setItem("accessToken", tokens.accessToken);
					localStorage.setItem("refreshToken", tokens.refreshToken);
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

	async getAllBoards(userId: string): Promise<BoardType[]> {
		const token = localStorage.getItem("accessToken");

		const data = await fetch(`${environment.apiUrl}/board/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return (await data.json()) ?? [];
	}
}
