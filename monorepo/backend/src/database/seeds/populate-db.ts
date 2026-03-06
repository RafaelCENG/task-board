import type { DataSource } from "typeorm";
import type { Seeder } from "typeorm-extension";
import { Board } from "../../modules/board/board.entity";
import { Status, Task } from "../../modules/task/task.entity";
import { User } from "../../modules/users/user.entity";

export class Users1772549092436 implements Seeder {
	track = false;

	public async run(dataSource: DataSource): Promise<any> {
		const userRepo = dataSource.getRepository(User);
		const boardRepo = dataSource.getRepository(Board);
		const taskRepo = dataSource.getRepository(Task);

		const [savedUser] = await userRepo.save([
			{
				email: "test@gmail.com",
				password: "12345678",
			},
		]);

		const savedBoard = await boardRepo.save({
			name: "My Board",
			description: "A default board with sample tasks",
			isDefault: true,
			user: { id: savedUser.id },
		});

		await taskRepo.save([
			{
				name: "Task in Progress",
				status: Status.INPROGRESS,
				icon: "timer",
				board: { id: savedBoard.id },
			},
			{
				name: "Task Completed",
				icon: "power",
				status: Status.COMPLETED,
				board: { id: savedBoard.id },
			},
			{
				name: "Task Won't Do",
				icon: "coffee",
				status: Status.WONTDO,
				board: { id: savedBoard.id },
			},
			{
				name: "Task To Do",
				description: "This is a seed populated",
				icon: "book",
				status: Status.TODO,
				board: { id: savedBoard.id },
			},
		]);
	}
}
