import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../models/resume.model';

@Component({
  selector: 'app-resume-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {
  resumeForm: FormGroup;
  isEditMode = false;
  resumeId: string | null = null;
  isLoading = false;
  currentTabIndex = 0;

  // Opzioni per i menu a tendina
  livelliLingua = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Madrelingua'];
  livelliCompetenza = [
    { value: 1, viewValue: 'Base' },
    { value: 2, viewValue: 'Intermedio' },
    { value: 3, viewValue: 'Avanzato' },
    { value: 4, viewValue: 'Esperto' },
    { value: 5, viewValue: 'Padronanza' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService,
    private snackBar: MatSnackBar
  ) {
    this.resumeForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.resumeId = id;
        this.loadResume(id);
      }
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // Sezione Dati Generali
      datiGenerali: this.fb.group({
        codiceFiscale: ['', [Validators.required, Validators.pattern(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/)]],
        nome: ['', Validators.required],
        cognome: ['', Validators.required],
        dataDiNascita: ['', Validators.required],
        paeseDiNascita: ['', Validators.required],
        luogoDiNascita: ['', Validators.required],
        indirizzoResidenza: ['', Validators.required],
        capResidenza: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
        cittaResidenza: ['', Validators.required],
        paeseResidenza: ['', Validators.required],
        indirizzoDomicilio: [''],
        capDomicilio: [''],
        cittaDomicilio: [''],
        paeseDomicilio: [''],
        nazionalita: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]],
        email: ['', [Validators.required, Validators.email]]
      }),
      
      // Sezione Esperienze Lavorative
      esperienzeLavorative: this.fb.array([]),
      
      // Sezione Istruzione e Formazione
      istruzioneFormazione: this.fb.array([]),
      
      // Sezione Competenze Linguistiche
      competenzeLinguistiche: this.fb.array([]),
      
      // Sezione Competenze Trasversali
      competenzeTrasversali: this.fb.array([]),
      
      // Sezione Competenze Tecnologiche
      competenzeTecnologiche: this.fb.array([]),
      
      // Sezione Competenze Organizzative
      competenzeOrganizzative: this.fb.array([]),
      
      // Sezione Competenze Funzionali
      competenzeFunzionali: this.fb.array([])
    });
  }

  private loadResume(id: string): void {
    this.isLoading = true;
    // In un'applicazione reale, chiameremmo il servizio per ottenere i dati
    // this.resumeService.getResumeById(id).subscribe({
    //   next: (resume) => {
    //     this.populateForm(resume);
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error('Errore nel caricamento del curriculum', error);
    //     this.snackBar.open('Errore nel caricamento del curriculum', 'Chiudi', { duration: 3000 });
    //     this.isLoading = false;
    //     this.router.navigate(['/resumes']);
    //   }
    // });

    // Per ora usiamo i dati di esempio
    setTimeout(() => {
      const sampleResume = this.resumeService.getSampleResume();
      this.populateForm(sampleResume);
      this.isLoading = false;
    }, 1000);
  }

  private populateForm(resume: any): void {
    // Popola i campi del form con i dati del curriculum
    this.resumeForm.patchValue({
      datiGenerali: resume.datiGenerali
    });
    
    // Qui andrebbe la logica per popolare gli array di esperienze, competenze, ecc.
  }

  onSubmit(): void {
    if (this.resumeForm.valid) {
      this.isLoading = true;
      const resumeData = this.resumeForm.value;

      if (this.isEditMode && this.resumeId) {
        // Aggiornamento di un curriculum esistente
        // this.resumeService.updateResume(this.resumeId, resumeData).subscribe({
        //   next: () => {
        //     this.snackBar.open('Curriculum aggiornato con successo', 'Chiudi', { duration: 3000 });
        //     this.router.navigate(['/resumes']);
        //   },
        //   error: (error) => {
        //     console.error('Errore nell\'aggiornamento del curriculum', error);
        //     this.snackBar.open('Errore nell\'aggiornamento del curriculum', 'Chiudi', { duration: 3000 });
        //     this.isLoading = false;
        //   }
        // });
      } else {
        // Creazione di un nuovo curriculum
        // this.resumeService.createResume(resumeData).subscribe({
        //   next: () => {
        //     this.snackBar.open('Curriculum creato con successo', 'Chiudi', { duration: 3000 });
        //     this.router.navigate(['/resumes']);
        //   },
        //   error: (error) => {
        //     console.error('Errore nella creazione del curriculum', error);
        //     this.snackBar.open('Errore nella creazione del curriculum', 'Chiudi', { duration: 3000 });
        //     this.isLoading = false;
        //   }
        // });
      }

      // Per ora mostriamo solo un messaggio
      this.snackBar.open('Funzionalità di salvataggio in sviluppo', 'Chiudi', { duration: 3000 });
      this.isLoading = false;
    } else {
      // Mostra errori di validazione
      this.markFormGroupTouched(this.resumeForm);
      this.snackBar.open('Per favore, controlla i campi obbligatori', 'Chiudi', { duration: 3000 });
    }
  }

  onCancel(): void {
    if (this.resumeForm.pristine || confirm('Sei sicuro di voler annullare le modifiche?')) {
      this.router.navigate(['/resumes']);
    }
  }

  // Metodo per mostrare gli errori di validazione
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Metodi per gestire le schede
  nextTab(): void {
    if (this.currentTabIndex < 5) {
      this.currentTabIndex++;
    }
  }

  prevTab(): void {
    if (this.currentTabIndex > 0) {
      this.currentTabIndex--;
    }
  }

  // Metodi per gestire gli array dinamici (es. esperienze, competenze, ecc.)
  // Questi verranno implementati nelle prossime iterazioni
}
