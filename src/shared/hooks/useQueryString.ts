import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParam = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const setQueryParam = useCallback(
    (key: string, value: string | null) => {
      const newSearchParams = new URLSearchParams(searchParams);

      if (value === null || value === '') {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams]
  );

  const setMultipleQueryParams = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === '') {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams]
  );

  const clearQueryParams = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    getQueryParam,
    setQueryParam,
    setMultipleQueryParams,
    clearQueryParams,
    searchParams,
  };
};
