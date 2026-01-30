export interface Resume {
  datiGenerali: DatiGenerali;
  esperienzeLavorative: EsperienzaLavorativa[];
  istruzioneFormazione: IstruzioneFormazione[];
  competenzeLinguistiche: CompetenzaLinguistico[];
  competenzeTrasversali: CompetenzaTrasversale[];
  competenzeTecnologiche: CompetenzaTecnologico[];
  competenzeOrganizzative: CompetenzaOrganizzativo[];
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
  dataInizio: string;
  dataFine: string;
  azienda: string;
  ruolo: string;
  descrizione: string;
  altro?: string;
}

export interface IstruzioneFormazione {
  dataInizio: string;
  dataFine: string;
  enteRilascio: string;
  titolo: string;
  descrizione: string;
}

export interface CompetenzaLinguistico {
  lingua: string;
  livelloAscolto: string;
  livelloLettura: string;
  livelloProduzioneOrale: string;
  livelloInterazioneOrale: string;
}

export interface CompetenzaTrasversale {
  titolo: string;
  descrizione: string;
}

export interface CompetenzaTecnologico {
  titolo: string;
  descrizione: string;
}

export interface CompetenzaOrganizzativo {
  titolo: string;
  descrizione: string;
}

export interface CompetenzaFunzionale {
  titolo: string;
  descrizione: string;
}
