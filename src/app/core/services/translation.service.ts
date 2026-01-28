import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: any = {};
  private http = inject(HttpClient);

  loadTranslations(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get('assets/i18n/it.json').subscribe({
        next: (data) => {
          this.translations = data;
          resolve();
        },
        error: () => {
          console.warn('Errore nel caricamento delle traduzioni. Verranno utilizzati i valori di default.');
          this.translations = {
            app: { title: 'Curriculum Management' }
          };
          resolve();
        }
      });
    });
  }

  getTranslation(key: string): string {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key; // Restituisce la chiave se non trova la traduzione
    }

    return value || key;
  }
}
