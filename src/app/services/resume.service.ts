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

  // Get all resumes
  getResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.apiUrl}/list`);
  }

  // Get a single resume by ID
  getResumeById(id: string): Observable<Resume> {
    return this.http.get<Resume>(`${this.apiUrl}/${id}`);
  }

  // Create a new resume
  createResume(resume: Omit<Resume, 'id'>): Observable<Resume> {
    return this.http.post<Resume>(this.apiUrl, resume);
  }

  // Update an existing resume
  updateResume(id: string, resume: Partial<Resume>): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/${id}`, resume);
  }

  // Delete a resume
  deleteResume(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Generate a sample resume for testing
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

  // New: get resume list from API
  getResumeList(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${environment.apiUrl}/resume-list`);
  }

  // New: get working experiences for a given codice fiscale
  getWorkingExperience(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/working-experience/${cf}`);
  }

  // New: get soft skills for a given codice fiscale
  getSoftSkills(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/soft-skills/${cf}`);
  }

  // Education / training
  getEducationTraining(cf: string): Observable<any[]> {
    // use hyphenated path 'education-training'
    return this.http.get<any[]>(`${environment.apiUrl}/education-training/${cf}`);
  }

  // Language skills
  getLanguageSkills(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/language-skills/${cf}`);
  }

  // Technical skills
  getTechnicalSkills(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/technical-skills/${cf}`);
  }

  // Organizational skills
  getOrganizationalSkills(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/organizational-skills/${cf}`);
  }

  // Functional skills
  getFunctionalSkills(cf: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/functional-skills/${cf}`);
  }
}
