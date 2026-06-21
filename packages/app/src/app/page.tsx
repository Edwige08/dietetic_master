'use client';

import { Button, Dock, Navbar, CardFeature } from "@monorepo/design-system";

export default function Home() {
  return (
    <div>
      <Navbar activeItem="home" />
      <main>
        <div className="center">
          <h1>Dietetic Master</h1>

          <section className="hero">
            <h3>Maîtrisez la diététique par la pratique</h3>
            <p>Dietetic Master transforme votre apprentissage en expérience immersive. Révisez les notions fondamentales de vos cours, analysez des cas cliniques complets et progressez à votre rythme.</p>
            <div className='hero-buttons'>
              <Button onClick={() => window.location.href = "/signup"} variant="primary">
                Je m&apos;inscris
              </Button>
              <Button onClick={() => window.location.href = "/login"} variant="secondary">
                Je me connecte
              </Button>
            </div>
          </section>

        </div>

        <div className="flex-column gap-md">
          <h2>Fonctionnalités</h2>
          <p>Des outils puissants pour vous aider à maîtriser vos connaissances en diététique et à progresser efficacement.</p>

          <div className="cards-3">
            <CardFeature title="Flashcards" description="Révisez les notions fondamentales de vos cours grâce à des cartes interactives." variant="secondary" />
            <div className="cards-2-row">
              <CardFeature title="Quiz" description="Testez vos connaissances avec des quiz et suivez vos progrès." variant="warning" />
              <CardFeature title="Cas cliniques" description="Analysez des cas cliniques complets et appliquez vos connaissances comme en situation réelle." variant="success" />
            </div>
          </div>

        </div>

        <div className="center">
          <h2>Dietetic Master vous attend</h2>
          <p>Rejoignez-nous dès maintenant et commencez votre parcours vers l&apos;excellence en diététique.</p>
        </div>

        <Dock activeItem="home" />
      </main>
    </div>
  );
}
