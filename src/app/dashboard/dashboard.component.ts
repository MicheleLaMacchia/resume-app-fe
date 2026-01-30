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
import { Resume } from '../models/resume.model';
import { forkJoin, of } from 'rxjs';
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
  recentResumes: Resume[] = [];
  isLoading = true;

  stats = {
    totalResumes: 0,
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

  constructor() {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    const cf = sessionStorage.getItem('codiceFiscale') || '';

    const resumes$ = this.resumeService.getResumeList().pipe(catchError(() => of([])));
    const experiences$ = cf ? this.resumeService.getWorkingExperience(cf).pipe(catchError(() => of([]))) : of([]);
    const education$ = cf ? this.resumeService.getEducationTraining(cf).pipe(catchError(() => of([]))) : of([]);
    const languages$ = cf ? this.resumeService.getLanguageSkills(cf).pipe(catchError(() => of([]))) : of([]);
    const trasversali$ = cf ? this.resumeService.getSoftSkills(cf).pipe(catchError(() => of([]))) : of([]);
    const tecnologiche$ = cf ? this.resumeService.getTechnicalSkills(cf).pipe(catchError(() => of([]))) : of([]);
    const organizzative$ = cf ? this.resumeService.getOrganizationalSkills(cf).pipe(catchError(() => of([]))) : of([]);
    const funzionali$ = cf ? this.resumeService.getFunctionalSkills(cf).pipe(catchError(() => of([]))) : of([]);

    forkJoin([resumes$, experiences$, education$, languages$, trasversali$, tecnologiche$, organizzative$, funzionali$]).subscribe({
      next: ([resumes, experiences, education, languages, trasversali, tecnologiche, organizzative, funzionali]) => {
        this.recentResumes = Array.isArray(resumes) ? (resumes as Resume[]).slice(0,5) : [];
        this.stats.totalResumes = Array.isArray(resumes) ? resumes.length : 0;
        this.stats.esperienze = Array.isArray(experiences) ? experiences.length : 0;
        this.stats.istruzione = Array.isArray(education) ? education.length : 0;
        this.stats.lingue = Array.isArray(languages) ? languages.length : 0;
        this.stats.trasversali = Array.isArray(trasversali) ? trasversali.length : 0;
        this.stats.tecnologiche = Array.isArray(tecnologiche) ? tecnologiche.length : 0;
        this.stats.organizzative = Array.isArray(organizzative) ? organizzative.length : 0;
        this.stats.funzionali = Array.isArray(funzionali) ? funzionali.length : 0;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Errore durante il caricamento del cruscotto', 'OK', { duration: 3000 });
      }
    });
  }

  private calculateStats(): void {
    this.stats.totalResumes = this.recentResumes.length;
    this.stats.esperienze = this.recentResumes.reduce((acc, curr) => {
      return acc + (curr.esperienzeLavorative?.length || 0);
    }, 0);
    this.stats.istruzione = this.recentResumes.reduce((acc, curr) => {
      return acc + (curr.istruzioneFormazione?.length || 0);
    }, 0);
    this.stats.lingue = this.recentResumes.reduce((acc, curr) => {
      return acc + (curr.competenzeLinguistiche?.length || 0);
    }, 0);
    this.stats.trasversali = this.recentResumes.reduce((acc, curr) => {
      return acc + (curr.competenzeTrasversali?.length || 0);
    }, 0);
    this.stats.tecnologiche = this.recentResumes.reduce((acc, curr) => {
      return acc + (curr.competenzeTecnologiche?.length || 0);
    }, 0);
    this.stats.organizzative = this.recentResumes.reduce((acc, curr) => {
      return acc + (curr.competenzeOrganizzative?.length || 0);
    }, 0);
    this.stats.funzionali = this.recentResumes.reduce((acc, curr) => {
      return acc + (curr.competenzeFunzionali?.length || 0);
    }, 0);
  }

  onAddNewResume(): void {
    // Will be implemented later
    this.snackBar.open('Funzionalità di aggiunta curriculum in sviluppo', 'OK', {
      duration: 3000
    });
  }
}
