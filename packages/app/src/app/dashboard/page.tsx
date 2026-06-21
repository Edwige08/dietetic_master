'use client';

import { useRouter } from 'next/navigation';
import { Button, Dock, Navbar } from "@monorepo/design-system";
import "../globals.css";
import Link from 'next/link';
import { useAuth } from '@/contexts/useAuth';
import { useEffect } from 'react';
import { CardsIcon } from '@phosphor-icons/react/dist/icons/Cards';
import { SealQuestionIcon } from '@phosphor-icons/react/dist/icons/SealQuestion';
import { BrainIcon } from '@phosphor-icons/react/dist/icons/Brain';
import { RankingIcon } from '@phosphor-icons/react/dist/icons/Ranking';

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout: authLogout } = useAuth();

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //   router.replace('/login');
  //   }
  // }, [isAuthenticated, isLoading, router]);

  async function handleLogout() {
    await authLogout();
    router.push('/');
  }
  
  if (isLoading) {
    return (
      <div>
        <Navbar activeItem="profile" />
        <main>
          <div className="center">
            <h1>Chargement...</h1>
            <p>Vérification de votre session en cours.</p>
          </div>
        </main>
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <div>
      <Navbar activeItem="profile" />
      <main >

        <div className="center">
          <h1>Bienvenue {user?.first_name ?? ' !'}</h1>
          <p>Prêt pour te lancer dans les révisions ?</p>
        </div>

        <div className="activities">
          <Link href="/flashcards" className="activity-button bg-secondary-light" >
            <CardsIcon size={32} />
            <p>Flashcards</p>
          </Link>
          <Link href="/quiz" className="activity-button bg-primary-light disabled">
            <SealQuestionIcon size={32} />
            <p>Quiz (en cours de création)</p>
          </Link>
          <Link href="/cas-clinique" className="activity-button bg-success-light disabled">
            <BrainIcon size={32} />
            <p>Cas clinique (en cours de création)</p>
          </Link>
          <Link href="/mes-progres" className="activity-button bg-warning-light disabled">
            <RankingIcon size={32} />
            <p>Mes progrès (en cours de création)</p>
          </Link>
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
