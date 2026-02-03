import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumeListComponent } from './resume/resume-list/resume-list.component';
import { ResumeFormComponent } from './resume/resume-form/resume-form.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  // Root redirect to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login page
  { path: 'login', component: LoginComponent },

  // Protected/app area under root
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'personal-data', loadComponent: () => import('./personal-data/personal-data.component').then(m => m.PersonalDataComponent), data: { title: 'Dati Generali' } },
      { path: 'working-experience', loadComponent: () => import('./working-experience/working-experience.component').then(m => m.WorkingExperienceComponent), data: { title: 'Esperienze Lavorative' } },
      { path: 'education-training', loadComponent: () => import('./education-training/education-training.component').then(m => m.EducationTrainingComponent), data: { title: 'Istruzione e Formazione' } },
      { path: 'language-skills', loadComponent: () => import('./language-skills/language-skills.component').then(m => m.LanguageSkillsComponent), data: { title: 'Lingue' } },
      { path: 'soft-skills', loadComponent: () => import('./soft-skills/soft-skills.component').then(m => m.SoftSkillsComponent), data: { title: 'Competenze Trasversali' } },
      { path: 'functional-skills', loadComponent: () => import('./functional-skills/functional-skills.component').then(m => m.FunctionalSkillsComponent), data: { title: 'Competenze Funzionali' } },
      { path: 'technical-skills', loadComponent: () => import('./technical-skills/technical-skills.component').then(m => m.TechnicalSkillsComponent), data: { title: 'Competenze Tecnologiche' } },
      { path: 'organizational-skills', loadComponent: () => import('./organizational-skills/organizational-skills.component').then(m => m.OrganizationalSkillsComponent), data: { title: 'Competenze Organizzative' } },
      { path: 'resumes', component: ResumeListComponent, data: { title: 'Elenco Curriculum' } },
      { path: 'resumes/new', component: ResumeFormComponent, data: { title: 'Nuovo Curriculum' } },
      { path: 'resumes/edit/:id', component: ResumeFormComponent, data: { title: 'Modifica Curriculum' } },
      { path: '404', component: PageNotFoundComponent, data: { title: 'Pagina non trovata' } },
      { path: '**', redirectTo: '/dashboard' }
    ]
  }
];
