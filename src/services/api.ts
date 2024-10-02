import axios from "axios";
import { ICapivara } from "../providers/@types";

const API_URL = "https://capivara-catalog.vercel.app/api/capivaras";
// const API_URL_LOCAL = "http://localhost:8888/api/capivaras";

export const fetchCapivaras = async (): Promise<ICapivara[]> => {
  const response = await axios.get(API_URL);
  return response.data.map((item: any) => ({
    _id: item._id,
    nome: item.nome,
    idade: item.idade,
    peso: item.peso,
    statusSaude: item.statusSaude,
    habitat: item.habitat,
    comportamento: item.comportamento,
    dieta: item.dieta,
    observacoes: item.observacoes,
  }));
};

export const createCapivara = async (capivara: {
  nome: string;
  idade: number;
  peso: number;
  habitat: string;
}): Promise<ICapivara> => {
  const response = await axios.post(API_URL, capivara);
  return response.data;
};

export const updateCapivara = async (
  id: string,
  capivara: { nome: string; idade: number; peso: number; habitat: string }
): Promise<ICapivara> => {
  const response = await axios.put(`${API_URL}/${id}`, capivara);
  return response.data;
};

export const deleteCapivara = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
