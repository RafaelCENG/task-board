import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "../task/task.entity";
import { User } from "../users/user.entity";

@Entity({ name: "boards" })
export class Board {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	user_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: "user_id" })
	user: User;

	@OneToMany(
		() => Task,
		(task) => task.board,
	)
	tasks: Task[];
}
