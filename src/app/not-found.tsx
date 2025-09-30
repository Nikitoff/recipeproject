import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Страница не найдена</h2>
      <p>К сожалению, такой страницы нет.</p>
      <Link href="/">На главную</Link>
    </div>
  );
}


