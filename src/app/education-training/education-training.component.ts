import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ResumeService } from '../services/resume.service';
import { IstruzioneFormazione } from '../models/resume.model';

@Component({
  selector: 'app-education-training',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSnackBarModule, 
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './education-training.component.html',
  styleUrls: ['./education-training.component.scss']
})
export class EducationTrainingComponent implements OnInit {
  private router = inject(Router);
  private resumeService = inject(ResumeService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  cf = sessionStorage.getItem('codiceFiscale') || '';
  items: IstruzioneFormazione[] = [];
  originalItems: IstruzioneFormazione[] = [];
  editing: boolean[] = [];
  isLoading = true;

  ngOnInit(): void {
    if (!this.cf) {
      this.snackBar.open('Codice fiscale non trovato', 'OK', { duration: 3000 });
      this.router.navigate(['/dashboard']);
      return;
    }
    this.loadItems();
  }

  loadItems(): void {
    this.isLoading = true;
    this.resumeService.getEducationTraining(this.cf).subscribe({
      next: (data: any[]) => {
        this.items = Array.isArray(data) ? data : [];
        this.originalItems = JSON.parse(JSON.stringify(this.items));
        this.editing = this.items.map(() => false);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Errore recupero istruzione', 'OK', { duration: 3000 });
      }
    });
  }

  toggleEdit(i: number): void {
    this.editing[i] = !this.editing[i];
  }

  deleteItem(i: number): void {
    if (this.items.length <= 1) return;
    this.items.splice(i, 1);
    this.editing.splice(i, 1);
  }

  addNew(): void {
    const empty: IstruzioneFormazione = {
      dataInizio: '',
      dataFine: '',
      enteRilascio: '',
      titolo: '',
      descrizione: ''
    };
    this.items.push(empty);
    this.editing.push(true);
  }

  onReset(): void {
    this.items = JSON.parse(JSON.stringify(this.originalItems));
    this.editing = this.items.map(() => false);
  }

  onSave(): void {
    if (!this.cf) return;
    this.resumeService.updateEducationTraining(this.cf, this.items).subscribe({
      next: () => {
        this.snackBar.open('Istruzione salvata', 'OK', { duration: 3000 });
        this.originalItems = JSON.parse(JSON.stringify(this.items));
        this.editing = this.items.map(() => false);
      },
      error: () => this.snackBar.open('Errore salvataggio istruzione', 'OK', { duration: 3000 })
    });
  }

  isDirty(): boolean {
    return JSON.stringify(this.items) !== JSON.stringify(this.originalItems);
  }

  onBack(): void {
    if (this.isDirty()) {
      const ref = this.dialog.open(ConfirmLeaveDialogEdu);
      ref.afterClosed().subscribe(result => {
        if (result === 'back') {
          this.router.navigate(['/dashboard']);
        }
      });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}

@Component({
  selector: 'confirm-leave-dialog-edu',
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
export class ConfirmLeaveDialogEdu {
  private dialogRef = inject(MatDialogRef<ConfirmLeaveDialogEdu>);
  close(action: 'back' | 'continue') {
    this.dialogRef.close(action);
  }
}
