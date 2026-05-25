'use client';

import { Dock } from "@monorepo/design-system";
import "../globals.css";

export default function Home() {
  return (
      <main >

        <div className="center">
          <h1>Mentions légales</h1>

          <h2>Editeur du site</h2>
          <ul>
            <li>Nom du projet : Dietetic Master</li>
            <li>Responsable de publication : Edwige Saves</li>
            <li>Statut : Étudiant chez Ada Tech School</li>
            <li>Adresse e-mail : [Adresse e-mail de contact]</li>
          </ul>

          <h2>Hébergement</h2>
          <p>Ce site est hébergé par la société Vercel Inc., située 340 S Lemon Ave #4133 Walnut, CA 91789, et joignable au (559) 288-7060.</p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur Dietetic Master, notamment les textes, visuels, éléments graphiques, logos,
            maquettes et ressources pédagogiques, est protégé par le droit de la propriété intellectuelle. Toute reproduction,
            représentation, diffusion ou exploitation sans autorisation préalable est interdite, sauf dans les cas prévus par la loi.
          </p>

          <h2>Responsabilité</h2>
          <p>
            Le site a pour objectif de proposer des contenus pédagogiques et informatifs autour de la diététique. Malgré le soin apporté à la
            mise à jour des informations, l&apos;éditeur ne peut garantir l&apos;absence totale d&apos;erreurs, d&apos;omissions ou d&apos;indisponibilités
            techniques.
          </p>

          <h2>Données personnelles</h2>
              <p>
                Les modalités de collecte et de traitement des données personnelles sont détaillées dans la politique de
                confidentialité du site. Toute demande relative à vos données peut être adressée au contact indiqué ci-dessous.
              </p>

          <h2>Contact et exercice des droits</h2>
            <p id="legal-contact-title">
              Pour toute question concernant le site, vos données personnelles ou l&apos;exercice de vos droits RGPD, vous pouvez écrire à l&apos;adresse
              suivante : <a href="mailto:contact@dietetic-master.fr">contact@dietetic-master.fr</a>. Attention, ce site étant en construction, cette adresse mail est fictive.
            </p>


        </div>

        <Dock />

      </main>
  );
}
