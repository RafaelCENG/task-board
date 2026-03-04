/** biome-ignore-all lint/style/useImportType: <explanation> */
import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	async signUp(createUserDto: CreateUserDto) {
		const existingUser = await this.usersService.findByEmail(
			createUserDto.email,
		);
		if (existingUser) {
			throw new BadRequestException("Email already used");
		}
		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
		const newUser = await this.usersService.create({
			...createUserDto,
			password: hashedPassword,
		});
		const tokens = await this.getTokens(newUser.id, newUser.email);
		await this.updateRefreshToken(newUser.id, tokens.refreshToken);
		return tokens;
	}

	async signIn(data: AuthDto) {
		const user = await this.usersService.findByEmail(data.email);
		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}
		const isPasswordValid = await bcrypt.compare(data.password, user.password);
		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials");
		}
		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}

	async refreshTokens(userId: string, refreshToken: string) {
		const user = await this.usersService.findById(userId);
		if (!user || !user.refreshToken)
			throw new ForbiddenException("Access Denied");
		const refreshTokenMatches = await bcrypt.compare(
			refreshToken,
			user.refreshToken,
		);
		if (!refreshTokenMatches) throw new ForbiddenException("Access Denied");
		const tokens = await this.getTokens(user.id, user.email);
		await this.updateRefreshToken(user.id, tokens.refreshToken);
		return tokens;
	}
	async logout(userId: string) {
		return this.usersService.update(userId, { refreshToken: null });
	}

	async updateRefreshToken(userId: string, refreshToken: string) {
		const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
		await this.usersService.update(userId, {
			refreshToken: hashedRefreshToken,
		});
	}

	async getTokens(userId: string, email: string) {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
				},
				{
					secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
					expiresIn: "15m",
				},
			),
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
				},
				{
					secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
					expiresIn: "7d",
				},
			),
		]);

		return {
			accessToken,
			refreshToken,
		};
	}
}
