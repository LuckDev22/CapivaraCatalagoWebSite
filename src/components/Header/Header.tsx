import "./Header.css";
import logo from "../../assets/images/capivaraLogo.jpg";

interface HeaderProps {
  onAdd: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdd }) => {
  return (
    <header className="header">
      <img src={logo} alt="Logo do Catálogo de Capivaras" className="logo" />
      <h1>CapiVÁRIAS</h1>
      <button onClick={onAdd} className="add-button">
        Adicionar Capivara
      </button>
    </header>
  );
};

export default Header;
