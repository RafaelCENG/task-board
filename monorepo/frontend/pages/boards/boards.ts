import {
	Combobox,
	ComboboxInput,
	ComboboxPopup,
	ComboboxPopupContainer,
} from "@angular/aria/combobox";
import { Listbox, Option } from "@angular/aria/listbox";
import { OverlayModule } from "@angular/cdk/overlay";
import {
	afterRenderEffect,
	Component,
	computed,
	effect,
	inject,
	input,
	resource,
	viewChild,
	viewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroPlusCircle } from "@ng-icons/heroicons/outline";
import { Board } from "../../services/board";
import { Task } from "../task/task";

@Component({
	selector: "app-boards",
	imports: [
		Task,
		Combobox,
		ComboboxInput,
		ComboboxPopup,
		ComboboxPopupContainer,
		Listbox,
		Option,
		OverlayModule,
		NgIcon,
	],
	templateUrl: "./boards.html",
	styleUrl: "./boards.scss",
	viewProviders: [
		provideIcons({
			heroPlusCircle,
		}),
	],
})
export class Boards {
	userId = input("");
	boardId = input("");
	private boardService = inject(Board);
	private router = inject(Router);

	/** The combobox listbox popup. */
	listbox = viewChild<Listbox<string>>(Listbox);
	/** The options available in the listbox. */
	options = viewChildren<Option<string>>(Option);
	/** A reference to the ng aria combobox. */
	combobox = viewChild<Combobox<string>>(Combobox);
	/** The string that is displayed in the combobox. */
	displayValue = computed(() => {
		const values = this.listbox()?.values() || [];
		if (values.length) {
			const board = this.boards().find((b) => b.id === Number(values[0]));
			return board?.name ?? "Select a board";
		}
		return "Select a board";
	});

	boardsResource = resource({
		params: () => ({ id: this.userId() }),
		loader: (params) => this.boardService.getAllBoards(params.params.id),
		defaultValue: [],
	});

	boards = computed(() => this.boardsResource.value());

	selectedBoard = computed(() => {
		if (this.boardId()) {
			return this.boards().find((board) => board.id === Number(this.boardId()));
		} else {
			return this.boards().find((board) => board.isDefault);
		}
	});

	onSelectBoard(boardId: number) {
		this.router.navigate(["/home/board", boardId]);
	}

	onDefaultBoard(boardId: number) {
		console.log({ boardId });
		this.boardService
			.setDefaultBoard(this.userId(), String(boardId))
			.then(() => {
				this.boardsResource.reload();
			});
	}

	onCreateNewTask() {
		const boardId = this.selectedBoard()?.id;
		if (!boardId) return;
		this.boardService.createNewTask(boardId.toString()).subscribe(() => {
			this.boardsResource.reload();
		});
	}

	constructor() {
		effect(() => {
			console.log("Boards loaded:", this.boards());
		});

		// Scrolls to the active item when the active option changes.
		// The slight delay here is to ensure animations are done before scrolling.
		afterRenderEffect(() => {
			const option = this.options().find((opt) => opt.active());
			setTimeout(
				() => option?.element.scrollIntoView({ block: "nearest" }),
				50,
			);
		});
		// Resets the listbox scroll position when the combobox is closed.
		afterRenderEffect(() => {
			if (!this.combobox()?.expanded()) {
				setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
			}
		});
	}
}
