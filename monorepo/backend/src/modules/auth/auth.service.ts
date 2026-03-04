/** biome-ignore-all lint/style/useImportType: <explanation> */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}
	async signIn(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findOne(email);
		if (user?.password !== pass) {
			throw new UnauthorizedException();
		}
		const payload = { sub: user.id, username: user.email };
		return {
			// 💡 Here the JWT secret key that's used for signing the payload
			// is the key that was passsed in the JwtModule
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
