'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dock, Input, Navbar } from "@monorepo/design-system";
import { register } from "@/lib/auth";
import "../globals.css";
import { verifyEmail } from '@/utils/VerifyEmail';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (!verifyEmail(formData.email)) {
      setErrorMessage("Le format de l'adresse email n'est pas correct");
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
      });

      setSuccessMessage('Compte créé. Tu peux maintenant te connecter.');
      router.push('/login');
    } catch {
      setErrorMessage('Impossible de créer le compte. Vérifie que l\'email est unique et que le mot de passe est valide.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Navbar />
      <main >

        <div className="center">
          <h1>Créer un compte</h1>
          <p>Afin d&apos;accéder aux fonctionnalités de <span className="bold">Dietetic Master</span>, il est nécessaire de créer un compte via le formulaire ci-dessous.</p>
        </div>

        <form className="flex-column form" onSubmit={handleSubmit}>
          <p className="intro-input">Les champs marqués d&apos;un astérisque (*) sont obligatoires.</p>
          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
          {successMessage ? <p className="form-success">{successMessage}</p> : null}
          <Input
            label="Prénom"
            type="text"
            name="firstName"
            placeholder="ex : John"
            autoComplete="given-name"
            required
            value={formData.firstName}
            onChange={(event) => updateField('firstName', event.target.value)}
          />
          <Input
            label="Nom"
            type="text"
            name="lastName"
            placeholder="ex : Doe"
            autoComplete="family-name"
            required
            value={formData.lastName}
            onChange={(event) => updateField('lastName', event.target.value)}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="ex : john.doe@example.com"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
          <Input
            label="Mot de passe"
            type="password"
            name="password"
            placeholder="ex : ********"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={(event) => updateField('password', event.target.value)}
          />
          <div className="fit-content">
            <Button variant="primary" type="submit" isLoading={isSubmitting} loadingLabel="Creation...">
              Je m&apos;inscris
            </Button>
            <a href="/login" className="center redirection-link">J&apos;ai déjà un compte</a>
          </div>
        </form>
        <Dock />

      </main>
    </div>
  );
}
