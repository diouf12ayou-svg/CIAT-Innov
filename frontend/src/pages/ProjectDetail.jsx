import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { getProject } from "../services/api";

export default function ProjectDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);

  useEffect(() => {
    getProject(id).then(setP);
  }, [id]);

  if (!p) {
    return <main className="section"><p>Chargement du projet...</p></main>;
  }

  const url = window.location.href;

  const statut =
    p.status === "publié" || p.status === "published"
      ? "Publié"
      : p.status || "En attente";

  function downloadQRCode() {
    const svg = document.getElementById("project-qr");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      canvas.width = 500;
      canvas.height = 500;
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, 500, 500);
      context.drawImage(image, 0, 0, 500, 500);

      const link = document.createElement("a");
      link.download = "QR-CIAT-" + p.title + ".png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    image.src =
      "data:image/svg+xml;charset=utf-8," +
      encodeURIComponent(svgData);
  }

  function printProject() {
    window.print();
  }

  return (
    <main className="section">
      <div className="no-print">
        <Link className="btn secondary" to="/galerie">
          ← Retour à la galerie
        </Link>
      </div>

      <div className="detail">
        <div>
          <span className="badge">{p.domain}</span>
          <h1>{p.title}</h1>
          <p>{p.description}</p>

          <div className="project-image large">🚀</div>

          <h2>Problème</h2>
          <p>{p.problem || "Non renseigné"}</p>

          <h2>Solution</h2>
          <p>{p.solution || "Non renseignée"}</p>

          <h2>Équipe</h2>
          <p>{p.team || "À renseigner"}</p>

          <h2>Informations du projet</h2>
          <p><strong>Cohorte :</strong> {p.cohort || "Non renseignée"}</p>
          <p><strong>Statut :</strong> {statut}</p>
        </div>

        <aside className="qr">
          <h3>QR Code du projet</h3>
          <QRCodeSVG id="project-qr" value={url} size={160} />
          <p>Scannez ce code pour accéder à cette fiche.</p>

          <div className="no-print">
            <button className="btn" onClick={downloadQRCode}>
              Télécharger le QR code
            </button>
          </div>
        </aside>
      </div>

      <div className="no-print" style={{ marginTop: "25px" }}>
        <button className="btn" onClick={printProject}>
          Imprimer la fiche / Enregistrer en PDF
        </button>
      </div>
    </main>
  );
}