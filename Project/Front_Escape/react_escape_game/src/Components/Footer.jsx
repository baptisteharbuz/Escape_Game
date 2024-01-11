import '../Styles/Footer.css'

const Footer = () => (
  <>
    <footer className="footer">
      <div className="Contact"><p>Une question ? Contactez nous !</p>
        <p> 📞 Numéro : <a href="tel:0666666666">0666666666</a></p>
        <p> ✉️ Mail : <a href="mailto:tbialasik@fcdigital.fr">tbialasik@fcdigital.fr</a></p></div>
      <div className="Sociaux">
        <p>Nos réseaux sociaux 😊 </p>
        <div className="réseau">
          <a href="https://www.facebook.com/photo/?fbid=106391088488280&set=a.106391115154944" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png" alt="Logo Facebook" href="https://www.facebook.com/photo/?fbid=106391088488280&set=a.106391115154944" target="_blank" /></a>
          <a href="https://www.instagram.com/p/Cik4bJejZPu/" target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png" alt="Logo Instagram" /></a>
        </div>
      </div>
      <div className="Mouv"><p>📍 Accès</p>
        <p>46 Rue Faidherbe, Lille (59350)</p>
        <p>MÉTRO</p>
        <p>Gare Lille Flandres</p>
        <p>Locaux accessibles aux personnes à mobilité réduite ♿</p></div>
    </footer>
  </>
);

export default Footer;


