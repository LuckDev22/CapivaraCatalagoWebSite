import CapivaraCard from "../Cards/CapivaraCard";
import { ICapivara } from "../../providers/@types";
import "./CapivaraList.css";

interface CapivaraListProps {
  capivaras: ICapivara[];
  onDelete: (id: string) => void;
  onEdit: (capivara: ICapivara) => void;
}

const CapivaraList: React.FC<CapivaraListProps> = ({
  capivaras,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="list-container">
      {capivaras.map((capivara) => (
        <CapivaraCard
          key={capivara._id}
          capivara={capivara}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default CapivaraList;
