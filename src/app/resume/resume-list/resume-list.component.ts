import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../models/resume.model';

@Component({
  selector: 'app-resume-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule
  ],
  providers: [MatSnackBar], // Aggiunto MatSnackBar ai provider
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss']
})
export class ResumeListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cognome', 'email', 'telefono', 'azioni'];
  dataSource: Resume[] = [];
  isLoading = true;

  private snackBar: MatSnackBar = inject(MatSnackBar);
  
  constructor(
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes(): void {
    this.isLoading = true;
    // In un'applicazione reale, chiameremmo il servizio per ottenere i dati
    // this.resumeService.getResumes().subscribe({
    //   next: (resumes) => {
    //     this.dataSource = resumes;
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error('Errore nel caricamento dei curriculum', error);
    //     this.snackBar.open('Errore nel caricamento dei curriculum', 'Chiudi', { duration: 3000 });
    //     this.isLoading = false;
    //   }
    // });

    // Per ora usiamo i dati di esempio
    setTimeout(() => {
      const sampleResume = this.resumeService.getSampleResume();
      this.dataSource = [sampleResume];
      this.isLoading = false;
    }, 1000);
  }

  deleteResume(id: string): void {
    if (confirm('Sei sicuro di voler eliminare questo curriculum?')) {
      // In un'applicazione reale, chiameremmo il servizio per eliminare
      // this.resumeService.deleteResume(id).subscribe({
      //   next: () => {
      //     this.snackBar.open('Curriculum eliminato con successo', 'Chiudi', { duration: 3000 });
      //     this.loadResumes();
      //   },
      //   error: (error) => {
      //     console.error('Errore nell\'eliminazione del curriculum', error);
      //     this.snackBar.open('Errore nell\'eliminazione del curriculum', 'Chiudi', { duration: 3000 });
      //   }
      // });
      
      // Per ora mostriamo solo un messaggio
      const snackBarRef: MatSnackBarRef<SimpleSnackBar> = this.snackBar.open(
        'Funzionalità di eliminazione in sviluppo', 
        'Chiudi', 
        { duration: 3000 } as any
      );
    }
  }
}
