import {Component, Inject} from '@angular/core';
import {SharedModule} from "../../modules/shared/shared.module";
import {
    MAT_DIALOG_DATA, MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from "@angular/material/dialog";


export interface DialogData {
    title: string;
    message: string;
}

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        SharedModule
    ],
    templateUrl: './confirm-dialog.component.html',
    styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
    confirm = true;

    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
