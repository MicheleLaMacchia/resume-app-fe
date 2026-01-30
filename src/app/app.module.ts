import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumeListComponent } from './resume/resume-list/resume-list.component';
import { ResumeFormComponent } from './resume/resume-form/resume-form.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    ResumeListComponent,
    ResumeFormComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
