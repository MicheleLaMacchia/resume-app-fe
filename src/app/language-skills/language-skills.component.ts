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
import { CompetenzaLinguistica } from '../models/resume.model';

@Component({
  selector: 'app-language-skills',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule],
  templateUrl: './language-skills.component.html',
  styleUrls: ['./language-skills.component.scss']
})
export class LanguageSkillsComponent implements OnInit {
  private router = inject(Router);
  private resumeService = inject(ResumeService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  cf = sessionStorage.getItem('codiceFiscale') || '';
  items: CompetenzaLinguistica[] = [];
  originalItems: CompetenzaLinguistica[] = [];
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
    this.resumeService.getLanguageSkills(this.cf).subscribe({
      next: (data: any[]) => {
        this.items = Array.isArray(data) ? data : [];
        this.originalItems = JSON.parse(JSON.stringify(this.items));
        this.editing = this.items.map(() => false);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Errore recupero lingue', 'OK', { duration: 3000 });
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
    const empty: CompetenzaLinguistica = {
      lingua: '',
      livelloAscolto: '',
      livelloLettura: '',
      livelloProduzioneOrale: '',
      livelloInterazioneOrale: ''
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
    this.resumeService.updateLanguageSkills(this.cf, this.items).subscribe({
      next: (saved: any) => {
        this.snackBar.open('Lingue salvate', 'OK', { duration: 3000 });
        this.items = Array.isArray(saved?.competenzeLinguistiche) ? saved.competenzeLinguistiche : [];
        this.originalItems = JSON.parse(JSON.stringify(this.items));
        this.editing = this.items.map(() => false);
      },
      error: () => this.snackBar.open('Errore salvataggio lingue', 'OK', { duration: 3000 })
    });
  }

  isDirty(): boolean {
    return JSON.stringify(this.items) !== JSON.stringify(this.originalItems);
  }

  onBack(): void {
    if (this.isDirty()) {
      const ref = this.dialog.open(ConfirmLeaveDialogLang);
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
  selector: 'confirm-leave-dialog-lang',
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
export class ConfirmLeaveDialogLang {
  private dialogRef = inject(MatDialogRef<ConfirmLeaveDialogLang>);
  close(action: 'back' | 'continue') {
    this.dialogRef.close(action);
  }
}
