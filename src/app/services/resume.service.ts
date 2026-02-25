import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Resume } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = `${environment.apiUrl}/resume`;

  constructor(private http: HttpClient) { }

  getSampleResume(): Resume {
    return {
      datiGenerali: {
        codiceFiscale: 'AAAAAA00A00A000A',
        nome: 'Mike',
        cognome: 'Lama',
        dataDiNascita: '28/01/1991',
        paeseDiNascita: 'Italia',
        luogoDiNascita: 'Roma',
        indirizzoResidenza: 'Via Giuseppe Mazzini, 1',
        capResidenza: '00143',
        cittaResidenza: 'Roma',
        paeseResidenza: 'Italia',
        indirizzoDomicilio: 'Via Giuseppe Mazzini, 1',
        capDomicilio: '00143',
        cittaDomicilio: 'Roma',
        paeseDomicilio: 'Italia',
        nazionalita: 'Italiana',
        telefono: '3333333333',
        email: 'michele@gmail.com'
      },
      esperienzeLavorative: [
        {
          dataInizio: '18/09/2023',
          dataFine: 'Attuale',
          azienda: 'ENGINEERING INGEGNERIA INFORMATICA',
          ruolo: 'SOFTWARE DEVELOPMENT SPECIALIST',
          descrizione: 'Software Engineer / Tech Lead su ecosistemi di micro-servizi e web app.',
          altro: 'Sviluppo Fullstack (Java/Spring, Angular), Cloud, Docker, Agile.'
        }
      ],
      istruzioneFormazione: [
        {
          dataInizio: '22/12/2025',
          dataFine: '22/12/2028',
          enteRilascio: 'Google Cloud',
          titolo: 'ASSOCIATE CLOUD ENGINEER CERTIFICATION',
          descrizione: 'Certificazione tecnica Google Cloud.'
        }
      ],
      competenzeLinguistiche: [
        {
          lingua: 'ITALIANO',
          livelloAscolto: 'Madrelingua',
          livelloLettura: 'Madrelingua',
          livelloProduzioneOrale: 'Madrelingua',
          livelloInterazioneOrale: 'Madrelingua'
        }
      ],
      competenzeTrasversali: [
        {
          titolo: 'Problem Solving Analitico',
          descrizione: 'Analisi logica e risoluzione problematiche complesse.'
        }
      ],
      competenzeTecnologiche: [
        {
          titolo: 'Sviluppo Fullstack',
          descrizione: 'Java (Spring) e Angular/React.'
        }
      ],
      competenzeOrganizzative: [
        {
          titolo: 'Gestione Agile',
          descrizione: 'Operatività Jira e flussi di lavoro Agile.'
        }
      ],
      competenzeFunzionali: [
        {
          titolo: 'Analisi Requisiti',
          descrizione: 'Traduzione esigenze business in specifiche tecniche.'
        }
      ]
    };
  }

  getResume(cf: string): Observable<Resume> {
    // Explicitly request the latest version for the given codice fiscale
    return this.http.get<Resume>(`${this.apiUrl}/${cf}/latest`);
  }

  // Get list of SK/version identifiers for a given codice fiscale
  getResumeVersions(cf: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${cf}/versions`);
  }

  // New: get working experiences for a given codice fiscale
  getWorkingExperience(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/working-experience/${cf}`);
  }

  // New: get soft skills for a given codice fiscale
  getSoftSkills(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/soft-skills/${cf}`);
  }

  // Education / training
  getEducationTraining(cf: string): Observable<any[]> {
    // use hyphenated path 'education-training'
    return this.http.get<any[]>(`${this.apiUrl}/education-training/${cf}`);
  }

  // Language skills
  getLanguageSkills(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/language-skills/${cf}`);
  }

  // Technical skills
  getTechnicalSkills(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/technical-skills/${cf}`);
  }

  // Organizational skills
  getOrganizationalSkills(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/organizational-skills/${cf}`);
  }

  // Functional skills
  getFunctionalSkills(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/functional-skills/${cf}`);
  }

  // Personal data endpoints (datiGenerali)
  getPersonalData(cf: string) {
    return this.http.get(`${this.apiUrl}/personal-data/${cf}`);
  }

  updatePersonalData(cf: string, payload: any) {
    return this.http.put(`${this.apiUrl}/personal-data/${cf}`, payload);
  }

  // Update working experiences array (returns saved Resume)
  updateWorkingExperience(cf: string, payload: any[]): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/working-experience/${cf}`, payload);
  }

  // Update education/training array (returns saved Resume)
  updateEducationTraining(cf: string, payload: any[]): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/education-training/${cf}`, payload);
  }

  // Update language skills array (returns saved Resume)
  updateLanguageSkills(cf: string, payload: any[]): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/language-skills/${cf}`, payload);
  }

  // Update soft skills (competenze trasversali) (returns saved Resume)
  updateSoftSkills(cf: string, payload: any[]): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/soft-skills/${cf}`, payload);
  }

  // Update technical skills (competenze tecnologiche) (returns saved Resume)
  updateTechnicalSkills(cf: string, payload: any[]): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/technical-skills/${cf}`, payload);
  }

  // Update organizational skills (competenze organizzative) (returns saved Resume)
  updateOrganizationalSkills(cf: string, payload: any[]): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/organizational-skills/${cf}`, payload);
  }

  // Update functional skills (competenze funzionali) (returns saved Resume)
  updateFunctionalSkills(cf: string, payload: any[]): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/functional-skills/${cf}`, payload);
  }
}

