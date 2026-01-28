import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumeListComponent } from './resume/resume-list/resume-list.component';
import { ResumeFormComponent } from './resume/resume-form/resume-form.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Redirect to dashboard as default route
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      // Dashboard route
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      
      // Resume routes
      {
        path: 'resumes',
        component: ResumeListComponent,
        data: { title: 'Elenco Curriculum' }
      },
      {
        path: 'resumes/new',
        component: ResumeFormComponent,
        data: { title: 'Nuovo Curriculum' }
      },
      {
        path: 'resumes/edit/:id',
        component: ResumeFormComponent,
        data: { title: 'Modifica Curriculum' }
      },
      
      // Handle 404 - Page Not Found
      {
        path: '404',
        component: PageNotFoundComponent,
        data: { title: 'Pagina non trovata' }
      },
      
      // Redirect any unknown routes to the dashboard
      { path: '**', redirectTo: '/dashboard' }
    ]
  }
];
