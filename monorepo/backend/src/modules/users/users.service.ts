import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
	private readonly users = [
		{
			id: "1",
			email: "john@example.com",
			password: "changeme",
		},
		{
			id: "2",
			email: "maria@example.com",
			password: "guess",
		},
	];

	async findOne(email: string): Promise<User | undefined> {
		return this.users.find((user) => user.email === email);
	}
}
