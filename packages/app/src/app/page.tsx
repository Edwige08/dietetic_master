'use client';

import { Button } from '@dietetic_master/design-system';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Dietetic Master</h1>
      <div className="flex gap-4">
        <Button variant="primary">Bouton 1</Button>
        <Button variant="secondary">Bouton 2</Button>
      </div>
    </main>
  );
}
