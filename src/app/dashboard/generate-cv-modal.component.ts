import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { PrintService } from '../services/print.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-generate-cv-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './generate-cv-modal.component.html',
  styleUrls: ['./generate-cv-modal.component.scss']
})
export class GenerateCvModalComponent implements OnInit {
  templates: string[] = [];
  selectedTemplate: string | null = null;
  loading = false;

  constructor(
    private dialogRef: MatDialogRef<GenerateCvModalComponent>,
    private printService: PrintService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.printService.listTemplates().subscribe({
      next: (list) => this.templates = list,
      error: () => this.snackBar.open('Errore nel recupero dei template', 'OK', { duration:3000 })
    });
  }

  async download(): Promise<void> {
    const cf = sessionStorage.getItem('codiceFiscale');
    if(!cf) {
      this.snackBar.open('Codice fiscale non disponibile in sessione', 'OK', {duration:3000});
      return;
    }
    if(!this.selectedTemplate) {
      return;
    }
    const url = `${environment.apiUrl}/print/pdf/${encodeURIComponent(cf)}?template=${encodeURIComponent(this.selectedTemplate)}`;
    this.loading = true;
    try {
      const resp = await fetch(url);
      this.loading = false;
      if(!resp.ok) {
        let msg = 'Errore durante la generazione del PDF';
        try { const data = await resp.json(); msg = data.message || JSON.stringify(data); } catch(e){ try{ msg = await resp.text(); }catch{} }
        this.snackBar.open(msg, 'OK', { duration:5000 });
        return;
      }
      const blob = await resp.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${cf}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      this.dialogRef.close();
    } catch (err) {
      this.loading = false;
      this.snackBar.open('Errore di rete durante il download', 'OK', { duration:3000 });
    }
  }

  cancel(): void { this.dialogRef.close(); }
}
