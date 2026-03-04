import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "../board/board.entity";

export enum Status {
	TODO = "todo",
	INPROGRESS = "inprogress",
	COMPLETED = "completed",
	WONTDO = "wontdo",
}

@Entity({ name: "task" })
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column({
		type: "enum",
		enum: Status,
	})
	status: Status;

	@Column({ nullable: true })
	icon: string;

	@ManyToOne(() => Board, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "board_id" })
	board: Board;
}
