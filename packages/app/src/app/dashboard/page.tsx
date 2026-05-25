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
          <h1>Bienvenue</h1>
          <p>Vous êtes connecté à <span className="bold">Dietetic Master</span>.</p>
        </div>

        <Dock activeItem="profile" />

        <div className="fit-content">
          <Button variant="danger" onClick={handleLogout}>
            Se déconnecter
          </Button>
        </div>

      </main>
    </div>
  );
}
