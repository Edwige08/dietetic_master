'use client';

import { useRouter } from 'next/navigation';
import { Button, Dock, Navbar } from "@monorepo/design-system";
import { logout } from "@/lib/auth";
import "../globals.css";
import Link from 'next/dist/client/link';

export default function Home() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  return (
    <div>

      <Navbar activeItem="profile" />

      <main >

        <div className="center">
          <h1>Bienvenue Prénom</h1>
          <p>Prêt pour te lancer dans les révisions ?</p>
        </div>

        <div className="activities">
          <Link href="/flashcards" className="activity-button bg-secondary-light">Flashcards</Link>
          <Link href="/quiz" className="activity-button bg-primary-light">Quiz</Link>
          <Link href="/cas-clinique" className="activity-button bg-success-light">Cas clinique</Link>
          <Link href="/mes-progres" className="activity-button bg-warning-light">Mes progrès</Link>
        </div>
        


        <div className="fit-content">
          <Button variant="danger" onClick={handleLogout}>
            Se déconnecter
          </Button>
        </div>

        <Dock activeItem="profile" />
      </main>
    </div>
  );
}
