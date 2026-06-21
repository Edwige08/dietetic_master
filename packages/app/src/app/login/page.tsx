'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { Button, Dock, Input, Navbar } from "@monorepo/design-system";
import { useAuth } from '@/contexts/useAuth';
import "../globals.css";

export default function Home() {
  const router = useRouter();
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await authLogin(email, password);
      router.push('/dashboard');
    } catch (error) {
      const apiError = error as AxiosError<{ detail?: string }>;
      setErrorMessage(apiError.response?.data?.detail ?? 'Identifiants invalides. Verifie ton email et ton mot de passe.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Navbar />
      <main >

        <div className="center">
          <h1>Connexion</h1>
          <p>Afin de vous connecter à <span className="bold">Dietetic Master</span>, il est nécessaire de saisir vos informations de connexion via le formulaire ci-dessous.</p>
        </div>

        <form className="flex-column form" onSubmit={handleSubmit}>
          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="ex : john.doe@example.com"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            label="Mot de passe"
            type="password"
            name="password"
            placeholder="ex : ********"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="primary" type="submit" isLoading={isSubmitting} loadingLabel="Connexion...">
            Je me connecte
          </Button>
          <a href="/signup" className="center redirection-link">Je n&apos;ai pas de compte</a>
        </form>
        <Dock />

      </main>
    </div>
  );
}
