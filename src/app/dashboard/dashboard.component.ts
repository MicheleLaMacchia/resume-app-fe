import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ResumeService } from '../services/resume.service';
import { Router } from '@angular/router';
import { Resume } from '../models/resume.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule,MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  resume: Resume | null = null;
  isLoading = true;

  stats = {
    esperienze: 0,
    istruzione: 0,
    lingue: 0,
    trasversali: 0,
    tecnologiche: 0,
    organizzative: 0,
    funzionali: 0
  };

  private resumeService = inject(ResumeService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  onEditPersonalData(): void {
    this.router.navigate(['/personal-data']);
  }

  onEditWorkingExperience(): void {
    this.router.navigate(['/working-experience']);
  }

  onEditEducation(): void {
    this.router.navigate(['/education-training']);
  }

  onEditLanguages(): void {
    this.router.navigate(['/language-skills']);
  }

  onEditSoftSkills(): void {
    this.router.navigate(['/soft-skills']);
  }

  onEditFunctionalSkills(): void {
    this.router.navigate(['/functional-skills']);
  }

  onEditTechnicalSkills(): void {
    this.router.navigate(['/technical-skills']);
  }

  onEditOrganizational(): void {
    this.router.navigate(['/organizational-skills']);
  }

  loadDashboardData(): void {
    this.isLoading = true;
    const cf = sessionStorage.getItem('codiceFiscale') || '';

    if (!cf) {
      this.resume = null;
      this.isLoading = false;
      return;
    }

    this.resumeService.getResume(cf).pipe(catchError(() => of(null))).subscribe({
      next: (resume) => {
        this.resume = resume as Resume | null;
        this.calculateStats();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Errore durante il caricamento del cruscotto', 'OK', { duration: 3000 });
      }
    });
  }

  private calculateStats(): void {
    this.stats.esperienze = this.resume?.esperienzeLavorative?.length || 0;
    this.stats.istruzione = this.resume?.istruzioneFormazione?.length || 0;
    this.stats.lingue = this.resume?.competenzeLinguistiche?.length || 0;
    this.stats.trasversali = this.resume?.competenzeTrasversali?.length || 0;
    this.stats.tecnologiche = this.resume?.competenzeTecnologiche?.length || 0;
    this.stats.organizzative = this.resume?.competenzeOrganizzative?.length || 0;
    this.stats.funzionali = this.resume?.competenzeFunzionali?.length || 0;
  }

  onAddNewResume(): void {
    // Will be implemented later
    this.snackBar.open('Funzionalità di aggiunta curriculum in sviluppo', 'OK', {
      duration: 3000
    });
  }
}
