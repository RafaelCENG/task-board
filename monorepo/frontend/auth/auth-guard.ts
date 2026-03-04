import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { Auth } from "../services/auth";

function isTokenExpired(token: string): boolean {
	try {
		const decoded = jwtDecode<{ exp: number }>(token);
		return Date.now() > decoded.exp * 1000;
	} catch {
		return true;
	}
}

function redirectToLogin(router: Router): void {
	router.navigate(["/login"]);
}

export const authGuard: CanActivateFn = () => {
	const auth = inject(Auth);
	const router = inject(Router);

	const token = auth.getToken();
	if (!token) {
		redirectToLogin(router);
		return false;
	}

	if (isTokenExpired(token)) {
		auth.logout();
		redirectToLogin(router);
		return false;
	}

	return true;
};
