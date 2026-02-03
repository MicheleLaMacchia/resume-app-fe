import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ResumeService } from '../services/resume.service';
import { DatiGenerali } from '../models/resume.model';

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule],
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  private router = inject(Router);
  private resumeService = inject(ResumeService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  cf = sessionStorage.getItem('codiceFiscale') || '';
  isLoading = true;

  formModel: Partial<DatiGenerali> = {};
  private originalModel: Partial<DatiGenerali> | null = null;

  ngOnInit(): void {
    if (!this.cf) {
      this.snackBar.open('Codice fiscale non trovato', 'OK', { duration: 3000 });
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loadPersonalData();
  }

  loadPersonalData(): void {
    this.isLoading = true;
    this.resumeService.getPersonalData(this.cf).subscribe({
      next: (data: any) => {
        this.formModel = { ...data } || {};
        this.originalModel = JSON.parse(JSON.stringify(this.formModel));
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Errore recupero dati personali', 'OK', { duration: 3000 });
      }
    });
  }

  onBack(form?: NgForm): void {
    const dirty = form?.dirty;
    if (dirty) {
      const ref = this.dialog.open(ConfirmLeaveDialog);
      ref.afterClosed().subscribe(result => {
        if (result === 'back') {
          this.router.navigate(['/dashboard']);
        }
      });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  onSave(form: NgForm): void {
    if (!this.cf) return;
    this.resumeService.updatePersonalData(this.cf, this.formModel).subscribe({
      next: () => {
        this.snackBar.open('Dati salvati con successo', 'OK', { duration: 3000 });
        form.resetForm(this.formModel);
        this.originalModel = JSON.parse(JSON.stringify(this.formModel));
      },
      error: () => this.snackBar.open('Errore salvataggio dati', 'OK', { duration: 3000 })
    });
  }

  onReset(form: NgForm): void {
    if (this.originalModel) {
      this.formModel = JSON.parse(JSON.stringify(this.originalModel));
      form.resetForm(this.formModel);
    }
  }
}

@Component({
  selector: 'confirm-leave-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-content>
        <p>se si torna indietro si perderanno tutte le modifiche effettuate</p>
      </mat-card-content>
      <mat-card-actions align="end">
        <button mat-button (click)="close('continue')">torna alle modifiche</button>
        <button mat-button color="primary" (click)="close('back')">torna indietro</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class ConfirmLeaveDialog {
  private dialogRef = inject(MatDialogRef<ConfirmLeaveDialog>);
  close(action: 'back' | 'continue') {
    this.dialogRef.close(action);
  }
}
