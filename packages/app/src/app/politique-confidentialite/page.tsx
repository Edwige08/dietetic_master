'use client';

import { Dock } from "@monorepo/design-system";
import "../globals.css";

export default function Home() {
  return (
      <main >

        <div className="center">
          <h1>Politique de confidentialité</h1>
          
          <p>Dernière mise à jour : 25 mai 2026</p>
          <p>
            Cette politique de confidentialité explique quelles données sont susceptibles d&apos;être collectées sur Dietetic Master, pourquoi elles
            sont utilisées et comment vous pouvez exercer vos droits.
          </p>

          <h2>1. Données collectées</h2>
          <p>
            Lorsque vous utilisez le site, nous pouvons collecter les informations que vous nous fournissez directement, comme votre
            nom, votre prénom, votre adresse e-mail et les informations liées à votre compte.
          </p>
          <p>
            Nous pouvons également collecter des données techniques nécessaires au bon fonctionnement du service, par exemple des
            informations de navigation, des données de connexion, le type d&apos;appareil utilisé ou des journaux techniques liés à la
            sécurité et à la maintenance de la plateforme.
          </p>

          <h2>2. Finalités du traitement</h2>
          <p>
            Les données personnelles sont utilisées pour créer et gérer votre compte, vous permettre d&apos;accéder aux contenus
            pédagogiques, assurer le suivi de votre progression et améliorer l&apos;expérience utilisateur sur la plateforme.
          </p>
          <p>
            Elles peuvent aussi être traitées pour répondre à vos demandes, prévenir les usages frauduleux, garantir la sécurité du site et
            respecter nos obligations légales.
          </p>

          <h2>3. Base légale</h2>
          <p>
            Les traitements réalisés reposent selon les cas sur l&apos;exécution du service que vous demandez, sur notre intérêt
            légitime à assurer le bon fonctionnement du site, ou sur votre consentement lorsque celui-ci est requis.
          </p>
          
          <h2>4. Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant la durée nécessaire à la gestion de votre compte et à la fourniture du service.
            Certaines données peuvent être conservées plus longtemps lorsque la loi l&apos;impose ou lorsque cela est nécessaire pour la
            défense de nos droits.
          </p>

          <h2>5. Destinataires des données</h2>
          <p>
            Les données sont accessibles uniquement aux personnes habilitées et aux prestataires techniques strictement
            nécessaires à l&apos;hébergement, à la maintenance et à l&apos;amélioration du service. Elles ne sont pas vendues à des
            tiers.
          </p>

          <h2>6. Sécurité</h2>
          <p>
            Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données contre
            l&apos;accès non autorisé, la perte, l&apos;altération ou la divulgation.
          </p>

          <h2>7. Vos droits</h2>
          <p>
            Conformément à la réglementation applicable, vous pouvez demander l&apos;accès à vos données, leur rectification, leur
            effacement, la limitation de leur traitement ou vous opposer à certains usages. Vous pouvez également demander la portabilité
            des données lorsque cela s&apos;applique.
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez également introduire une réclamation auprès de
            l&apos;autorité de contrôle compétente.
          </p>

          <h2>8. Cookies et mesure d&apos;audience</h2>
          <p>
            Le site peut utiliser des cookies ou technologies similaires pour assurer son fonctionnement, mémoriser certaines
            préférences et analyser la fréquentation. Lorsqu&apos;un consentement est nécessaire, il est recueilli avant le dépôt des
            cookies concernés.
          </p>

          <h2>9. Modifications</h2>
          <p>
            Cette politique de confidentialité peut être mise à jour pour refléter les évolutions du service, de la législation ou de nos
            pratiques. La date de mise à jour figurant en haut de page permet d&apos;identifier la version en vigueur.
          </p>

          <h2>10. Exercer vos droits RGPD</h2>
          <p>
            Pour demander l&apos;accès, la rectification ou la suppression de vos données, vous pouvez contacter l&apos;équipe Dietetic Master.
          </p>
          <p>
            Adresse e-mail de contact : <a href="mailto:contact@dietetic-master.fr">contact@dietetic-master.fr</a>. Attention, ce site étant en construction, cette adresse mail est fictive.
          </p>
          


        </div>

        <Dock />

      </main>
  );
}
