'use client';

import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

export function useAuth() {
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userRole = getCookie('userRole') as string | undefined;
    setRole(userRole || null);
    setIsLoading(false);
  }, []);

  return {
    role,
    isLoading,
    isAuthenticated: !!role
  };
} 