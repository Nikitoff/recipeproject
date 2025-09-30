'use client';
import React from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  return (
    <html>
      <body style={{ padding: 24 }}>
        <h2>Произошла ошибка</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Обновить страницу</button>
      </body>
    </html>
  );
}


