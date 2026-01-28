export interface Resume {
  id?: string;
  datiGenerali: DatiGenerali;
  esperienzeLavorative: EsperienzaLavorativa[];
  istruzioneFormazione: IstruzioneFormazione[];
  competenzeLinguistiche: CompetenzaLinguistica[];
  competenzeTrasversali: CompetenzaTrasversale[];
  competenzeTecnologiche: CompetenzaTecnologica[];
  competenzeOrganizzative: CompetenzaOrganizzativa[];
  competenzeFunzionali: CompetenzaFunzionale[];
}

export interface DatiGenerali {
  codiceFiscale: string;
  nome: string;
  cognome: string;
  dataDiNascita: string;
  paeseDiNascita: string;
  luogoDiNascita: string;
  indirizzoResidenza: string;
  capResidenza: string;
  cittaResidenza: string;
  paeseResidenza: string;
  indirizzoDomicilio: string;
  capDomicilio: string;
  cittaDomicilio: string;
  paeseDomicilio: string;
  nazionalita: string;
  telefono: string;
  email: string;
}

export interface EsperienzaLavorativa {
  id?: string;
  dataInizio: string;
  dataFine: string;
  azienda: string;
  ruolo: string;
  descrizione: string;
  altro?: string;
}

export interface IstruzioneFormazione {
  id?: string;
  dataInizio: string;
  dataFine: string;
  enteRilascio: string;
  titolo: string;
  descrizione: string;
}

export interface CompetenzaLinguistica {
  id?: string;
  lingua: string;
  livelloAscolto: string;
  livelloLettura: string;
  livelloProduzioneOrale: string;
  livelloInterazioneOrale: string;
}

export interface CompetenzaTrasversale {
  id?: string;
  titolo: string;
  descrizione: string;
}

export interface CompetenzaTecnologica {
  id?: string;
  titolo: string;
  descrizione: string;
}

export interface CompetenzaOrganizzativa {
  id?: string;
  titolo: string;
  descrizione: string;
}

export interface CompetenzaFunzionale {
  id?: string;
  titolo: string;
  descrizione: string;
}
