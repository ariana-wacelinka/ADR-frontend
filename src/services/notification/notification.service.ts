import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private snackBar: MatSnackBar) { }

    showSuccess(message: string, duration: number = 3000): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: duration,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-toast']
        });
    }

    showError(message: string, duration: number = 4000): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: duration,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-toast']
        });
    }

    showInfo(message: string, duration: number = 3000): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: duration,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['info-toast']
        });
    }

    showWarning(message: string, duration: number = 3000): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: duration,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['warning-toast']
        });
    }
}
