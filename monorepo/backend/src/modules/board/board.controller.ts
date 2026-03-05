import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "../../../src/common/guards/accessToken.guard";
import { BoardService } from "./board.service";

@Controller("board")
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@UseGuards(AccessTokenGuard)
	@Get(":userId")
	findAll(@Param("userId") id: string) {
		return this.boardService.findAll(id);
	}
}
