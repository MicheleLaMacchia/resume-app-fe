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
import { EsperienzaLavorativa } from '../models/resume.model';

@Component({
  selector: 'app-working-experience',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule],
  templateUrl: './working-experience.component.html',
  styleUrls: ['./working-experience.component.scss']
})
export class WorkingExperienceComponent implements OnInit {
  private router = inject(Router);
  private resumeService = inject(ResumeService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  cf = sessionStorage.getItem('codiceFiscale') || '';
  working: EsperienzaLavorativa[] = [];
  originalWorking: EsperienzaLavorativa[] = [];
  editing: boolean[] = [];
  isLoading = true;

  ngOnInit(): void {
    if (!this.cf) {
      this.snackBar.open('Codice fiscale non trovato', 'OK', { duration: 3000 });
      this.router.navigate(['/dashboard']);
      return;
    }
    this.loadWorking();
  }

  loadWorking(): void {
    this.isLoading = true;
    this.resumeService.getWorkingExperience(this.cf).subscribe({
      next: (data: any[]) => {
        this.working = Array.isArray(data) ? data : [];
        this.originalWorking = JSON.parse(JSON.stringify(this.working));
        this.editing = this.working.map(() => false);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Errore recupero esperienze', 'OK', { duration: 3000 });
      }
    });
  }

  toggleEdit(i: number): void {
    this.editing[i] = !this.editing[i];
  }

  deleteItem(i: number): void {
    if (this.working.length <= 1) return;
    this.working.splice(i, 1);
    this.editing.splice(i, 1);
  }

  addNew(): void {
    const empty: EsperienzaLavorativa = {
      dataInizio: '',
      dataFine: '',
      azienda: '',
      ruolo: '',
      descrizione: '',
      altro: ''
    };
    this.working.push(empty);
    this.editing.push(true);
  }

  onReset(): void {
    this.working = JSON.parse(JSON.stringify(this.originalWorking));
    this.editing = this.working.map(() => false);
  }

  onSave(): void {
    if (!this.cf) return;
    this.resumeService.updateWorkingExperience(this.cf, this.working).subscribe({
      next: (saved: any) => {
        const savedResume = saved as any;
        this.working = Array.isArray(savedResume?.esperienzeLavorative) ? savedResume.esperienzeLavorative : this.working;
        this.snackBar.open('Esperienze salvate', 'OK', { duration: 3000 });
        this.originalWorking = JSON.parse(JSON.stringify(this.working));
        this.editing = this.working.map(() => false);
      },
      error: () => this.snackBar.open('Errore salvataggio esperienze', 'OK', { duration: 3000 })
    });
  }

  isDirty(): boolean {
    return JSON.stringify(this.working) !== JSON.stringify(this.originalWorking);
  }

  onBack(): void {
    if (this.isDirty()) {
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
}

@Component({
  selector: 'confirm-leave-dialog-wk',
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
