'use client';

import { Button } from "@monorepo/design-system";

export default function Home() {
  return (
      <main >

        <div className="center">
          <h1>Dietetic Master</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia fermentum eros, ac sollicitudin arcu sollicitudin nec.</p>
        </div>

        <div className="flex-row">

          <Button variant="primary" onClick={() => alert('Primary!')}>
            S&apos;inscrire
          </Button>

          <Button variant="secondary" onClick={() => alert('Secondary!')}>
            Se connecter
          </Button>

        </div>

      </main>
  );
}
