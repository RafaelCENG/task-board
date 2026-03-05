import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "../../../src/common/guards/accessToken.guard";
import { BoardService } from "./board.service";

@UseGuards(AccessTokenGuard)
@Controller("board")
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Get(":userId")
	findAll(@Param("userId") id: string) {
		return this.boardService.findAll(id);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.boardService.findOne(id);
	}

	@Post("/new/:userId")
	createNewBoard(@Param("userId") userId: string) {
		return this.boardService.createNewBoard(userId);
	}
}
