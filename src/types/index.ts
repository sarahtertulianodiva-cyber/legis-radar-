export interface Proposicao {
  id: number;
  uri: string;
  siglaTipo: string;
  codTipo: number;
  numero: number;
  ano: number;
  ementa: string;
  ementaDetalhada?: string;
  dataApresentacao: string;
  statusProposicao?: {
    dataHora: string;
    descricaoSituacao: string;
    despacho: string;
  };
}

export interface Parlamentar {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
}

export interface Summary {
  idProposicao: number;
  resumoSimples: string;
  impacto: string;
  pontosChave: string[];
  traducaoJuridica: {
    termo: string;
    significado: string;
  }[];
}

export interface UserPreferences {
  temasSeguidos: string[];
  politicosSeguidos: number[];
  historicoPesquisa: string[];
}
