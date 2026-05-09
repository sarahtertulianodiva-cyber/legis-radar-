import { GoogleGenAI, Type } from "@google/genai";
import { Proposicao, Summary } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function summarizeBill(bill: Proposicao): Promise<Summary | null> {
  const prompt = `Você é um assistente jurídico especializado em simplificar leis para o cidadão comum. 
Analise a seguinte proposição legislativa:
Título/Tipo: ${bill.siglaTipo} ${bill.numero}/${bill.ano}
Ementa: ${bill.ementa}
Ementa Detalhada: ${bill.ementaDetalhada || 'Não fornecida'}

Tarefa:
1. Crie um resumo simples e direto (máximo 3 parágrafos) sem juridiquês.
2. Identifique o impacto potencial na vida do cidadão.
3. Liste 3 a 5 pontos-chave.
4. Identifique termos jurídicos complexos usados na ementa e forneça uma tradução simples para eles.

Responda em JSON seguindo este esquema:
{
  "resumoSimples": "string",
  "impacto": "string",
  "pontosChave": ["string"],
  "traducaoJuridica": [{"termo": "string", "significado": "string"}]
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            resumoSimples: { type: Type.STRING },
            impacto: { type: Type.STRING },
            pontosChave: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            traducaoJuridica: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  termo: { type: Type.STRING },
                  significado: { type: Type.STRING }
                },
                required: ["termo", "significado"]
              }
            }
          },
          required: ["resumoSimples", "impacto", "pontosChave", "traducaoJuridica"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) return null;
    
    const summary: Summary = JSON.parse(resultText);
    return { ...summary, idProposicao: bill.id };
  } catch (error) {
    console.error('Error generating summary:', error);
    return null;
  }
}
