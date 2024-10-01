import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <p>&copy; 2024 Capivara Catalog. All rights reserved.</p>
      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
