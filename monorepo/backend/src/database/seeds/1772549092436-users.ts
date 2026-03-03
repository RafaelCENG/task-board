import type { DataSource } from "typeorm";
import type { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../../modules/users/user.entity";

export class Users1772549092436 implements Seeder {
	track = false;

	public async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager,
	): Promise<any> {
		const user = dataSource.getRepository(User);
		// const hash = await bcrypt.hash('Password@123', 10);
		await user.save([
			{
				firstName: "Dadang",
				lastName: "Jebred",
				email: "dadang@jebred.com",
				password: "Password@123",
			},
			{
				firstName: "Atin",
				lastName: "Mustofa",
				email: "atin@mustofa.com",
				password: "Password@123",
			},
			{
				firstName: "Vina",
				lastName: "Vini",
				email: "vino@dadang.com",
				password: "Password@123",
			},
		]);
	}
}
