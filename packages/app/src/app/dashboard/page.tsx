'use client';

import { useRouter } from 'next/navigation';
import { Button, Dock } from "@monorepo/design-system";
import { logout } from "@/lib/auth";
import "../globals.css";

export default function Home() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  return (
      <main >

        <div className="center">
          <h1>Bienvenue</h1>
          <p>Vous êtes connecté à <span className="bold">Dietetic Master</span>.</p>
        </div>

        <Dock activeItem="profile" />

        <Button variant="danger" onClick={handleLogout}>
          Se déconnecter
        </Button>

      </main>
  );
}
