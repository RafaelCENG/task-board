import type { DataSource } from "typeorm";
import type { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Board } from "../../modules/board/board.entity";
import { Task } from "../../modules/task/task.entity";
import { User } from "../../modules/users/user.entity";

export class Users1772549092436 implements Seeder {
	track = false;

	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager,
	): Promise<any> {
		const user = dataSource.getRepository(User);
		const board = dataSource.getRepository(Board);
		const task = dataSource.getRepository(Task);
		// const hash = await bcrypt.hash('Password@123', 10);
		await user.save([
			{
				email: "test@gmail.com",
				password: "12345678",
			},
		]);
	}
}
