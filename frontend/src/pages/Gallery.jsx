
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/api";

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [q, setQ] = useState("");
  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((e) => setError(e.message));
  }, []);

  const domains = [...new Set(projects.map((p) => p.domain))];

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!q || p.title.toLowerCase().includes(q.toLowerCase())) &&
          (!domain || p.domain === domain)
      ),
    [projects, q, domain]
  );

  return (
    <main className="gallery-page">
      {error && (
        <p className="error">
          {error}. Vérifiez que Django est démarré.
        </p>
      )}

      {filtered.map((p) => (
        <section className="gallery-hero" key={p.id}>
          {p.image_url && (
            <img
              className="gallery-background"
              src={p.image_url}
              alt={p.title}
            />
          )}

          <div className="gallery-overlay"></div>

          <div className="gallery-content">
            <div className="gallery-top">
              <span className="eyebrow">
                CATALOGUE TECHNOLOGIQUE
              </span>

              <h1>Galerie des innovations</h1>

              <div className="filters">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rechercher un projet..."
                />

                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                >
                  <option value="">Tous les domaines</option>
                  {domains.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="gallery-bottom">
              <span className="badge">{p.domain}</span>

              <h2>{p.title}</h2>

              <p>{p.description}</p>

              <small>
                Cohorte {p.cohort || "—"} •{" "}
                {p.status === "published" ? "Publié" : "En attente"}
              </small>

              <div className="actions">
                <Link
                  to={"/projets/" + p.id}
                  className="btn"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      {filtered.length === 0 && !error && (
        <p className="no-projects">Aucun projet trouvé.</p>
      )}
    </main>
  );
}
