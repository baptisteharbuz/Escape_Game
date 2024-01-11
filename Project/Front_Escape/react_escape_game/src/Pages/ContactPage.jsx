import React from "react";
import '../Styles/ContactPage.css';
import '../Styles/TextStyle.css'; 


function ContactForm() {
  return (
    <>
      <div className="TotalContact">
        <div className="Contact-Page">
          <h1>Rejoignez-nous</h1>
          <br />
        <div className="PageContact">
          <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.483677520726!2d3.06516007665382!3d50.63670777393525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d5899f0839c7%3A0xc63c622856e4abe!2s46%20Rue%20Faidherbe%2C%2059800%20Lille!5e0!3m2!1sfr!2sfr!4v1701860927289!5m2!1sfr!2sfr"
          ></iframe>
        </div>


        <div className="Horaire">
          <table>
            <h3>🕒 Heures d'ouverture </h3>
            <p>de 9h à 12h et de 14h a 00h </p>
            <p>du Mardi au dimanche.</p>
            <p>📍 Accès </p>
            <p>46 Rue Faidherbe, Lille (59350) <br />MÉTRO Gare Lille Flandres <br />Locaux accessibles aux personnes à mobilité réduite ♿.</p>
          </table>
        </div>
        </div>
      </div>


    </>
  );
}

export default ContactForm;



