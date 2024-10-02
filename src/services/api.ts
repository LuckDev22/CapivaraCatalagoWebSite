import axios from "axios";
import { ICapivara } from "../providers/@types";
import { toast } from "react-toastify";

const API_URL = "https://capivara-catalog.vercel.app/api/capivaras";
// const API_URL_LOCAL = "http://localhost:8888/api/capivaras";

export const fetchCapivaras = async (): Promise<ICapivara[]> => {
  try {
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
  } catch (error) {
    toast.error("Erro ao buscar capivaras.");
    return [];
  }
};

export const createCapivara = async (capivara: {
  nome: string;
  idade: number;
  peso: number;
  habitat: string;
}): Promise<ICapivara | null> => {
  try {
    const response = await axios.post(API_URL, capivara);
    toast.success("Capivara criada com sucesso!");
    return response.data;
  } catch (error) {
    toast.error("Erro ao criar capivara.");
    return null;
  }
};

export const updateCapivara = async (
  id: string,
  capivara: { nome: string; idade: number; peso: number; habitat: string }
): Promise<ICapivara | null> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, capivara);
    toast.success("Capivara atualizada com sucesso!");
    return response.data;
  } catch (error) {
    toast.error("Erro ao atualizar capivara.");
    return null;
  }
};

export const deleteCapivara = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success("Capivara deletada com sucesso!");
  } catch (error) {
    toast.error("Erro ao deletar capivara.");
  }
};
