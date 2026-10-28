
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link className="brand" to="/">
        💡 <span>
          <b>CIAT Innov</b>
          <small>Galerie numérique des innovations</small>
        </span>
      </Link>

      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/galerie">Galerie</Link>
        <Link to="/about">À propos</Link>
        <Link to="/contact">Contact</Link>
        <Link className="btn" to="/connexion">Connexion</Link>
      </nav>
    </header>
  );
}
