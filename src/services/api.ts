import axios from "axios";
import { ICapivara } from "../providers/@types";

// const API_URL = "http://localhost:8888/api/capivaras";
const VERCEL_URL =
  "http://localhost:https://capivara-catalog.vercel.app/api/capivaras";

export const getCapivaras = async (): Promise<ICapivara[]> => {
  const response = await axios.get(VERCEL_URL);
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
}) => {
  const response = await axios.post(VERCEL_URL, capivara);
  return response.data;
};

export const updateCapivara = async (
  id: string,
  capivara: { nome: string; idade: number; peso: number; habitat: string }
) => {
  const response = await axios.put(`${VERCEL_URL}/${id}`, capivara);
  return response.data;
};

export const deleteCapivara = async (id: string) => {
  const response = await axios.delete(`${VERCEL_URL}/${id}`);
  return response.data;
};
