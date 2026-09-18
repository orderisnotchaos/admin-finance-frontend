
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Admin Finance<span>.</span></h2>
          <p>
                Te ayudamos a mantener tú negocio ordenado.
          </p>
        </div>

        <div className="footer-column">
          <h3>Empresa</h3>
          <a href="/">Inicio</a>
          <a href="/sobre-nosotros">Nosotros</a>
          <a target="_blank" href="https://wa.me/5491141957202" rel="noreferrer">Contacto</a>
        </div>

        <div className="footer-column">
          <h3>Recursos</h3>
          <a href="/FAQ">Preguntas frecuentes</a>
          <a target="_blank" href="https://wa.me/5491141957202" rel="noreferrer">Soporte</a>
          <a href="/politica-de-privacidad">Privacidad</a>
        </div>

        <div className="footer-column">
          <h3>Seguinos</h3>
          <div className="social-links">
            <a target="_blank" href="https://instagram.com" rel="noreferrer">Instagram</a>
            <a target="_blank" href="https://facebook.com" rel="noreferrer">Facebook</a>
            <a target="_blank" href="https://linkedin.com" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 admin-finance. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;