import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { TranslationService } from '../core/services/translation.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  appTitle = '';
  
  // Make router public for template access
  readonly router = inject(Router);
  private translationService = inject(TranslationService);
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuItems = [
    { title: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { title: 'Visualizza lista curriculum', icon: 'list_alt', path: '/resumes' }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  async ngOnInit() {
    await this.translationService.loadTranslations();
    this.appTitle = this.translationService.getTranslation('app.title');
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) {
        this.sidenav.close();
      }
    });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
