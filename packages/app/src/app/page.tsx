'use client';

import { Button, Dock } from "@monorepo/design-system";

export default function Home() {
  return (
      <main >

        <div className="center">
          <h1>Dietetic Master</h1>
          <p>Dietetic Master transforme votre apprentissage en expérience immersive. Révisez les notions fondamentales de vos cours, analysez des cas cliniques complets et progressez à votre rythme.  </p>
        </div>

        <div className="flex-row">
          <a href="/signup">
            <Button variant="primary">
              Je m&apos;inscris
            </Button>
          </a>

          <a href="/login">
            <Button variant="secondary">
              Je me connecte
            </Button>
          </a>

        </div>

        <div className="flex-column">
          <h2>Fonctionnalités</h2>
          <p>Des outils puissants pour vous aider à maîtriser vos connaissances en diététique et à progresser efficacement.</p>

          <div className="width-100">
            <h3>Flashcards</h3>
            <p>Révisez les notions fondamentales de vos cours grâce à des cartes interactives.</p>
          </div>
          
          <div className="width-100">
            <h3>Quiz </h3>
            <p>Testez vos connaissances avec des quiz et suivez vos progrès.</p>
          </div>

          <div>
            <h3>Cas cliniques</h3>
            <p>Analysez des cas cliniques complets et appliquez vos connaissances comme en situation réelle.</p>
          </div>

        </div>

        <div className="center">
          <h2>Dietetic Master vous attend</h2>
          <p>Rejoignez-nous dès maintenant et commencez votre parcours vers l&apos;excellence en diététique.</p>
        </div>

        <Dock activeItem="home" />

      </main>
  );
}
