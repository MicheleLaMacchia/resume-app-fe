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
    totalExperience: 0,
    totalSkills: 0
  };

  private resumeService = inject(ResumeService);
  private snackBar = inject(MatSnackBar);

  constructor() {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    // In a real app, we would call the API here
    // For now, we'll use the sample data
    setTimeout(() => {
      const sampleResume = this.resumeService.getSampleResume();
      this.recentResumes = [sampleResume];
      this.calculateStats();
      this.isLoading = false;
    }, 1000);
  }

  private calculateStats(): void {
    this.stats.totalResumes = this.recentResumes.length;
    this.stats.totalExperience = this.recentResumes.reduce((acc, curr) => {
      return acc + (curr.esperienzeLavorative?.length || 0);
    }, 0);
    this.stats.totalSkills = this.recentResumes.reduce((acc, curr) => {
      return acc +
        (curr.competenzeTecnologiche?.length || 0) +
        (curr.competenzeLinguistiche?.length || 0) +
        (curr.competenzeTrasversali?.length || 0);
    }, 0);
  }

  onAddNewResume(): void {
    // Will be implemented later
    this.snackBar.open('Funzionalità di aggiunta curriculum in sviluppo', 'OK', {
      duration: 3000
    });
  }
}
