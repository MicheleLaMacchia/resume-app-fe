import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Per ora usiamo componenti HTML standard invece di Angular Material
// I moduli di Angular Material verranno aggiunti successivamente

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <div class="not-found-container">
      <div class="card">
        <div class="card-header">
          <h1>404 - Pagina non trovata</h1>
        </div>
        <div class="card-content">
          <div class="content">
            <div class="error-icon">!</div>
            <h2>Ops! Pagina non trovata</h2>
            <p>La pagina che stai cercando potrebbe essere stata rimossa, rinominata o non è mai esistita.</p>
          </div>
        </div>
        <div class="card-actions">
          <a routerLink="/dashboard" class="btn">
            <span>🏠</span>
            Torna alla Dashboard
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 20px;
      background-color: #f5f5f5;
    }
    
    .card {
      max-width: 500px;
      text-align: center;
      padding: 30px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .card-header h1 {
      margin: 0 0 20px 0;
      color: #3f51b5;
      font-size: 24px;
    }
    
    .card-content {
      padding: 20px 0;
    }
    
    .content {
      padding: 20px 0;
    }
    
    .error-icon {
      font-size: 60px;
      width: 80px;
      height: 80px;
      background-color: #f44336;
      color: white;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      font-weight: bold;
    }
    
    h2 {
      color: #3f51b5;
      margin: 10px 0;
      font-size: 22px;
    }
    
    p {
      color: #757575;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      background-color: #3f51b5;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    
    .btn:hover {
      background-color: #303f9f;
    }
    
    .btn span {
      margin-right: 8px;
      font-size: 18px;
    }
  `]
})
export class PageNotFoundComponent {}
