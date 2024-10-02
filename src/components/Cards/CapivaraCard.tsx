import { ICapivara } from "../../providers/@types";
import "./CapivaraCard.css";

interface CapivaraCardProps {
  capivara: ICapivara;
  onDelete: (id: string) => void;
  onEdit: (capivara: ICapivara) => void;
}

const CapivaraCard: React.FC<CapivaraCardProps> = ({
  capivara,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="card-container">
      <h2>{capivara.nome}</h2>
      <p>Idade: {capivara.idade} anos</p>
      <p>Peso: {capivara.peso} kg</p>
      <p>Status de Saúde: {capivara.statusSaude}</p>
      <p>Habitat: {capivara.habitat}</p>
      <p>Comportamento: {capivara.comportamento}</p>
      <p>Comportamento: {capivara.comportamento}</p>
      {capivara.dieta && <p>Dieta: {capivara.dieta}</p>}
      {capivara.observacoes && <p>Observações: {capivara.observacoes}</p>}
      <div className="button-container">
        <button onClick={() => onDelete(capivara._id)}>Deletar</button>
        <button onClick={() => onEdit(capivara)}>Editar</button>
      </div>
    </div>
  );
};

export default CapivaraCard;
