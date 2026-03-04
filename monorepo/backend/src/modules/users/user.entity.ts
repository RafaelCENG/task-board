import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "../board/board.entity";
@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@CreateDateColumn({ nullable: true })
	created_at?: Date;

	@OneToMany(
		(type) => Board,
		(board) => board.user,
	)
	boards?: Board[];
}
