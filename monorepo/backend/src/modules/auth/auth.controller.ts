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
