'use client';

import React, { useMemo } from 'react';
import { RootStore, RootStoreContext } from '@/stores/RootStore';

export default function RootProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => new RootStore(), []);
  return (
    <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>
  );
}


