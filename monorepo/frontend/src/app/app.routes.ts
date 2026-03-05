import { Route } from "@angular/router";
import { authGuard } from "../../auth/auth-guard";
import { Home } from "../../pages/home/home";
import { Login } from "../../pages/login/login";
import { Register } from "../../pages/register/register";
export const appRoutes: Route[] = [
	{ path: "", redirectTo: "/home", pathMatch: "full" },
	{ path: "login", component: Login },
	{ path: "register", component: Register },
	{ path: "home", component: Home, canActivate: [authGuard] },
	{ path: "home/board/:id", component: Home, canActivate: [authGuard] },
	{ path: "**", component: Home, canActivate: [authGuard] },
];
