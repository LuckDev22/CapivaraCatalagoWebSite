import React, { useEffect, useState } from "react";
import CapivaraList from "../List/CapivaraList";
import CapivaraForm from "../Form/CapivaraForm";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import { ICapivara } from "../../providers/@types";
import "./CapivaraContainer.css";
import Footer from "../Footer/Footer";

const CapivaraContainer: React.FC = () => {
  const [capivaras, setCapivaras] = useState<ICapivara[]>([]);
  const [editingCapivara, setEditingCapivara] = useState<ICapivara | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCapivaras = async () => {
    const response = await fetch("http://localhost:8888/api/capivaras");
    const data = await response.json();
    setCapivaras(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:8888/api/capivaras/${id}`, {
      method: "DELETE",
    });
    fetchCapivaras();
  };

  const startEditing = (capivara: ICapivara) => {
    setEditingCapivara(capivara);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Omit<ICapivara, "id">) => {
    if (editingCapivara) {
      await fetch(
        `http://localhost:8888/api/capivaras/${editingCapivara._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    } else {
      // Adição
      await fetch("http://localhost:8888/api/capivaras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    fetchCapivaras();
    setEditingCapivara(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchCapivaras();
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
          fetchCapivaras={fetchCapivaras}
          onSubmit={handleSubmit}
        />
      </Modal>
      <Footer />
    </div>
  );
};

export default CapivaraContainer;
