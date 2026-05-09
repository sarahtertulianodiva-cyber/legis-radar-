import { Proposicao, Parlamentar } from '../types';

const CAMARA_BASE_URL = 'https://dadosabertos.camara.leg.br/api/v2';

export async function fetchRecentBills(pagesize = 10): Promise<Proposicao[]> {
  try {
    const response = await fetch(`${CAMARA_BASE_URL}/proposicoes?ordem=DESC&ordenarPor=id&itens=${pagesize}`);
    if (!response.ok) throw new Error('Falha ao buscar proposições');
    const data = await response.json();
    return data.dados;
  } catch (error) {
    console.error('Error fetching recent bills:', error);
    return [];
  }
}

export async function searchBills(query: string): Promise<Proposicao[]> {
  try {
    const response = await fetch(`${CAMARA_BASE_URL}/proposicoes?keywords=${encodeURIComponent(query)}&ordem=DESC&ordenarPor=id`);
    if (!response.ok) throw new Error('Falha na busca');
    const data = await response.json();
    return data.dados;
  } catch (error) {
    console.error('Error searching bills:', error);
    return [];
  }
}

export async function fetchBillDetails(id: number): Promise<Proposicao | null> {
  try {
    const response = await fetch(`${CAMARA_BASE_URL}/proposicoes/${id}`);
    if (!response.ok) throw new Error('Falha ao buscar detalhes da proposição');
    const data = await response.json();
    return data.dados;
  } catch (error) {
    console.error('Error fetching bill details:', error);
    return null;
  }
}

export async function fetchPoliticians(nome?: string): Promise<Parlamentar[]> {
  try {
    const url = nome 
      ? `${CAMARA_BASE_URL}/deputados?nome=${encodeURIComponent(nome)}&ordem=ASC&ordenarPor=nome`
      : `${CAMARA_BASE_URL}/deputados?ordem=ASC&ordenarPor=nome`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Falha ao buscar parlamentares');
    const data = await response.json();
    return data.dados;
  } catch (error) {
    console.error('Error fetching politicians:', error);
    return [];
  }
}
