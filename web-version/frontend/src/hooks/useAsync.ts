/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

/**
 * Hook personnalisé pour gérer les requêtes asynchrones
 * @param asyncFunction - Fonction asynchrone à exécuter
 * @param immediate - Si true, exécute la fonction immédiatement
 * @param initialParams - Paramètres initiaux pour la fonction
 */
export const useAsync = <T, P extends any[]>(
  asyncFunction: (...args: P) => Promise<T>,
  immediate = true,
  ...initialParams: P
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Fonction pour exécuter la requête asynchrone
  const execute = async (...params: P) => {
    setStatus('pending');
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction(...params);
      setValue(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error as Error);
      setStatus('error');
      throw error;
    }
  };

  // Exécuter immédiatement si demandé
  useEffect(() => {
    if (immediate) {
      execute(...initialParams);
    }
  }, [immediate]);

  return { execute, status, value, error, isLoading: status === 'pending' };
};
