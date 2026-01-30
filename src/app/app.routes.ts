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
      { path: 'resumes', component: ResumeListComponent, data: { title: 'Elenco Curriculum' } },
      { path: 'resumes/new', component: ResumeFormComponent, data: { title: 'Nuovo Curriculum' } },
      { path: 'resumes/edit/:id', component: ResumeFormComponent, data: { title: 'Modifica Curriculum' } },
      { path: '404', component: PageNotFoundComponent, data: { title: 'Pagina non trovata' } },
      { path: '**', redirectTo: '/dashboard' }
    ]
  }
];
