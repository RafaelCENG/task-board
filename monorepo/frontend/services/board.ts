import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { environment } from "../src/environments/environment";

export type BoardType = {
	id: number;
	name: string;
	description: string;
	user_id: string;
	isDefault: boolean;
	tasks: [
		{
			id: number;
			name: string;
			description: string;
			status: string;
			icon: string;
		},
	];
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

	createNewBoard(userId: string): Observable<BoardType> {
		const token = localStorage.getItem("accessToken");
		return this.http.post<BoardType>(
			`${environment.apiUrl}/board/new/${userId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
	}

	createNewTask(boardId: string): Observable<BoardType> {
		const token = localStorage.getItem("accessToken");
		return this.http.post<BoardType>(
			`${environment.apiUrl}/task/new/${boardId}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
	}

	async renameBoard(
		boardId: string,
		name: string,
		description?: string,
	): Promise<string> {
		const token = localStorage.getItem("accessToken");
		const data = await fetch(`${environment.apiUrl}/board/rename`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ boardId, name, description }),
		});
		return (await data.text()) ?? "Error renaming board";
	}

	async updateTask(
		taskId: number,
		name: string,
		description: string,
		status: string,
		icon: string,
	): Promise<string> {
		const token = localStorage.getItem("accessToken");
		const data = await fetch(`${environment.apiUrl}/task/update`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ taskId, name, description, status, icon }),
		});
		return (await data.text()) ?? "Error updating task";
	}

	async setDefaultBoard(userId: string, boardId: string): Promise<string> {
		const token = localStorage.getItem("accessToken");

		const data = await fetch(`${environment.apiUrl}/board/default`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId, boardId }),
		});
		return (await data.text()) ?? "Error setting default board";
	}
}
