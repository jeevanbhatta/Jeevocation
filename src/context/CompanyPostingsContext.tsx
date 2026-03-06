'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { CompanyPosting } from '@/lib/types';

const STORAGE_KEY = 'jeevocation-my-postings';

interface CompanyPostingsContextType {
  myPostings: CompanyPosting[];
  addPosting: (posting: Omit<CompanyPosting, 'id'>) => void;
}

const CompanyPostingsContext = createContext<CompanyPostingsContextType | undefined>(undefined);

function loadMyPostings(): CompanyPosting[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as CompanyPosting[];
  } catch {
    // ignore
  }
  return [];
}

function saveMyPostings(postings: CompanyPosting[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(postings));
  }
}

export function CompanyPostingsProvider({ children }: { children: React.ReactNode }) {
  const [myPostings, setMyPostings] = useState<CompanyPosting[]>([]);

  useEffect(() => {
    setMyPostings(loadMyPostings());
  }, []);

  const addPosting = useCallback((posting: Omit<CompanyPosting, 'id'>) => {
    const newPosting: CompanyPosting = {
      ...posting,
      id: Date.now().toString(),
    };
    setMyPostings((prev) => {
      const next = [newPosting, ...prev];
      saveMyPostings(next);
      return next;
    });
  }, []);

  return (
    <CompanyPostingsContext.Provider value={{ myPostings, addPosting }}>
      {children}
    </CompanyPostingsContext.Provider>
  );
}

export function useCompanyPostings() {
  const context = useContext(CompanyPostingsContext);
  if (!context) {
    throw new Error('useCompanyPostings must be used within CompanyPostingsProvider');
  }
  return context;
}
