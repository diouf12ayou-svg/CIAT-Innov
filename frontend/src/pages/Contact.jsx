
export default function Contact() {
  return (
    <main className="section contact-page">
      <h1>Contactez-nous</h1>
      <p>Vous souhaitez en savoir plus sur les innovations du CIAT ?</p>

      <form>
        <label>Nom complet</label>
        <input type="text" placeholder="Votre nom" />

        <label>Adresse e-mail</label>
        <input type="email" placeholder="Votre adresse e-mail" />

        <label>Sujet</label>
        <input type="text" placeholder="Objet de votre message" />

        <label>Message</label>
        <textarea placeholder="Écrivez votre message..." rows="5" />

        <button type="submit">Envoyer</button>
      </form>
    </main>
  );
}
