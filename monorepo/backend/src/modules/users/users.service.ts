import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BoardService } from "../board/board.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private userModel: Repository<User>,
		private boardService: BoardService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const createdUser = this.userModel.create(createUserDto);
		const savedUser = await this.userModel.save(createdUser);
		await this.boardService.createDefaultBoardForUser(savedUser.id);
		return savedUser;
	}

	async findById(id: string): Promise<User | null> {
		return this.userModel.findOne({ where: { id } });
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userModel.findOne({ where: { email } });
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		await this.userModel.update(id, updateUserDto);
		return this.findById(id);
	}

	// async remove(id: string): Promise<User> {
	// 	const user = await this.findById(id);
	// 	await this.userModel.delete(id);
	// 	return user;
	// }
}
