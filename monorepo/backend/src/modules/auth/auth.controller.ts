// /** biome-ignore-all lint/style/useImportType: <explanation> */
// import {
// 	Body,
// 	Controller,
// 	Get,
// 	HttpCode,
// 	HttpStatus,
// 	Post,
// 	Request,
// 	Res,
// } from "@nestjs/common";
// import type { Response } from "express";
// import { AuthService } from "./auth.service";
// import { Public } from "./decorators/public.decorator";

// @Controller("auth")
// export class AuthController {
// 	constructor(private authService: AuthService) {}

// 	@Public()
// 	@HttpCode(HttpStatus.OK)
// 	@Post("login")
// 	async login(
// 		@Body("email") email: string,
// 		@Body("password") password: string,
// 		@Res({ passthrough: true }) res: Response,
// 	) {
// 		const { access_token, refresh_token, payload } =
// 			await this.authService.signIn(email, password);
// 		res.cookie(REFRESH_TOKEN_COOKIE, refresh_token, refreshCookieOptions);
// 		return { access_token, refresh_token, payload };
// 	}

// 	@Public()
// 	@Post("register")
// 	async register(
// 		@Body("email") email: string,
// 		@Body("password") password: string,
// 	) {
// 		return this.authService.register(email, password);
// 	}

// 	@Public()
// 	@HttpCode(HttpStatus.OK)
// 	@Post("refresh")
// 	async refresh(@Request() req, @Res({ passthrough: true }) res: Response) {
// 		const token = req.cookies?.[REFRESH_TOKEN_COOKIE];
// 		const { access_token, refresh_token } =
// 			await this.authService.refreshTokens(token);
// 		res.cookie(REFRESH_TOKEN_COOKIE, refresh_token, refreshCookieOptions);
// 		return { access_token, refresh_token };
// 	}

// 	@HttpCode(HttpStatus.OK)
// 	@Post("logout")
// 	logout(@Res({ passthrough: true }) res: Response) {
// 		res.clearCookie(REFRESH_TOKEN_COOKIE, { path: "/api/auth/refresh" });
// 		return { message: "Logged out" };
// 	}

// 	@Get("profile")
// 	getProfile(@Request() req) {
// 		return req.user;
// 	}
// }
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { RefreshTokenGuard } from "../../../src/common/guards/refreshToken.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post("signup")
	signup(@Body() createUserDto: CreateUserDto) {
		return this.authService.signUp(createUserDto);
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Post("signin")
	signin(@Body() data: AuthDto) {
		return this.authService.signIn(data);
	}

	@Get("logout")
	logout(@Req() req: Request) {
		this.authService.logout(req.user["sub"]);
	}

	@UseGuards(RefreshTokenGuard)
	@Get("refresh")
	refreshTokens(@Req() req: Request) {
		const userId = req.user["sub"];
		const refreshToken = req.user["refreshToken"];
		return this.authService.refreshTokens(userId, refreshToken);
	}
}
