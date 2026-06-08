'use client';

import { useRouter } from 'next/navigation';
import { Button, Dock, Navbar } from "@monorepo/design-system";
import { logout } from "@/lib/auth";
import "../globals.css";

export default function Home() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  return (
    <div>
      <Navbar activeItem="profile" />

      <main >

        <div className="center">
          <h1>Quiz</h1>
          <p>Prêt pour te lancer dans les révisions ?</p>
        </div>

        <div>
          <h2>Mes quiz</h2>
          <div className="activity-button bg-primary-light">Créer un quiz</div>
        </div>
        
        <Dock activeItem="profile" />
      </main>
    </div>
  );
}
