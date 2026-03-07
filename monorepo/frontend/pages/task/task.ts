import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	inject,
	Output,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
	heroBookOpen,
	heroCheckBadge,
	heroClock,
	heroDocumentCheck,
	heroForward,
	heroMoon,
	heroTrash,
	heroXCircle,
} from "@ng-icons/heroicons/outline";
import { Board } from "../../services/board";
export type TaskType = {
	id: number;
	name: string;
	description: string;
	status: string;
	icon: string;
};

export interface DialogData {
	name: string;
	description: string;
	status: string;
	icon: string;
}

@Component({
	selector: "app-task",
	imports: [
		NgIcon,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
	],
	viewProviders: [
		provideIcons({
			heroBookOpen,
			heroClock,
			heroMoon,
			heroDocumentCheck,
			heroCheckBadge,
			heroXCircle,
			heroForward,
			heroTrash,
		}),
	],
	templateUrl: "./task.html",
	styleUrl: "./task.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Task {
	@Input() task: TaskType = {} as TaskType;
	@Output() taskUpdated = new EventEmitter<void>();
	readonly dialog = inject(MatDialog);
	readonly deleteDialog = inject(MatDialog);
	private taskService = inject(Board);

	openDialog(): void {
		// Passing the current task data to the dialog so it can be edited
		const dialogRef = this.dialog.open(TaskDialog, {
			data: {
				name: this.task.name,
				description: this.task.description,
				status: this.task.status,
				icon: this.task.icon,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result !== undefined) {
				this.task.name = result.name;
				this.task.description = result.description;
				this.task.status = result.status;
				this.task.icon = result.icon;
				this.taskService
					.updateTask(
						this.task.id,
						result.name,
						result.description,
						result.status,
						result.icon,
					)
					.then(() => {
						this.taskUpdated.emit();
					});
			}
		});
	}

	openDeleteDialog(): void {
		const dialogRef = this.deleteDialog.open(DeleteDialog);

		dialogRef.afterClosed().subscribe((result) => {
			if (result !== undefined) {
				this.taskService.deleteTask(this.task.id).then(() => {
					this.taskUpdated.emit();
				});
			}
		});
	}
}

@Component({
	selector: "app-task-dialog",
	templateUrl: "task-dialog.html",
	imports: [
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		NgIcon,
	],
	viewProviders: [
		provideIcons({
			heroBookOpen,
			heroClock,
			heroMoon,
			heroDocumentCheck,
			heroCheckBadge,
			heroForward,
			heroXCircle,
		}),
	],
	styles: [
		`
		.icon-selector {
			display: flex;
			gap: 12px;
			margin: 12px;
		}
		.icon-option {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 4px;
			padding: 8px 12px;
			border-radius: 12px;
			cursor: pointer;
			border: 2px solid transparent;
			background: none;
		}
		.icon-option:hover {
			background: rgba(148, 49, 167, 0.08);
		}
		.icon-option.selected {
			border-color: #9431a7;
			background: rgba(148, 49, 167, 0.12);
		}
		`,
	],
})
export class TaskDialog {
	readonly dialogRef = inject(MatDialogRef<TaskDialog>);
	readonly data = inject<DialogData>(MAT_DIALOG_DATA);
	name = this.data.name;
	description = this.data.description;
	status = this.data.status;
	icon = this.data.icon;
	onNoClick(): void {
		this.dialogRef.close();
	}
}

@Component({
	selector: "app-delete-dialog",
	templateUrl: "delete-dialog.html",
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
	],
})
export class DeleteDialog {
	readonly deleteDialogRef = inject(MatDialogRef<DeleteDialog>);

	onNoClick(): void {
		this.deleteDialogRef.close();
	}
}
