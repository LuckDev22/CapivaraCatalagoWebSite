import { useEffect, useState } from "react";
import CapivaraList from "../List/CapivaraList";
import CapivaraForm from "../Form/CapivaraForm";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ICapivara } from "../../providers/@types";
import {
  fetchCapivaras,
  createCapivara,
  updateCapivara,
  deleteCapivara,
} from "../../services/api";
import "./CapivaraContainer.css";

const CapivaraContainer: React.FC = () => {
  const [capivaras, setCapivaras] = useState<ICapivara[]>([]);
  const [editingCapivara, setEditingCapivara] = useState<ICapivara | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadCapivaras = async () => {
    const data = await fetchCapivaras();
    setCapivaras(data);
  };

  const handleDelete = async (id: string) => {
    await deleteCapivara(id);
    loadCapivaras();
  };

  const startEditing = (capivara: ICapivara) => {
    setEditingCapivara(capivara);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Omit<ICapivara, "_id">) => {
    if (editingCapivara) {
      await updateCapivara(editingCapivara._id, data);
    } else {
      await createCapivara(data);
    }
    loadCapivaras();
    setEditingCapivara(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadCapivaras();
  }, []);

  return (
    <div className="capivara-container">
      <Header
        onAdd={() => {
          setEditingCapivara(null);
          setIsModalOpen(true);
        }}
      />
      <div className="capivara-content">
        <CapivaraList
          capivaras={capivaras}
          onDelete={handleDelete}
          onEdit={startEditing}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CapivaraForm
          capivara={editingCapivara}
          setCapivara={setEditingCapivara}
          fetchCapivaras={loadCapivaras}
          onSubmit={handleSubmit}
        />
      </Modal>
      <Footer />
    </div>
  );
};

export default CapivaraContainer;
