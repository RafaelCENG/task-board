import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from "@nestjs/common";
import { AccessTokenGuard } from "../../../src/common/guards/accessToken.guard";
import { BoardService } from "./board.service";
import { DefaultBoardDto } from "./dto/default-board-dto";

@UseGuards(AccessTokenGuard)
@Controller("board")
export class BoardController {
	constructor(private readonly boardService: BoardService) {}

	@Put("/default")
	async defaultBoard(@Body() defaultBoardDto: DefaultBoardDto) {
		return this.boardService.defaultBoard(defaultBoardDto);
	}

	@Post("/new/:userId")
	createNewBoard(@Param("userId") userId: string) {
		return this.boardService.createNewBoard(userId);
	}

	@Get("/:userId")
	findAll(@Param("userId") id: string) {
		return this.boardService.findAll(id);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.boardService.findOne(id);
	}
}
