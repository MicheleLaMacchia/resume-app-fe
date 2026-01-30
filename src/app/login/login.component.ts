import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  codiceFiscale = '';

  constructor(private router: Router) {}

  login(): void {
    const cf = (this.codiceFiscale || '').trim();
    if (!cf) return;
    sessionStorage.setItem('codiceFiscale', cf);
    this.router.navigate(['/dashboard']);
  }
}
