import { useEffect, useState } from 'react';

type PromiseReturnType<T> = T extends (...args: any[]) => Promise<infer R> ? R : never;

type UseQueryProps<T extends (...args: any[]) => any> = {
  fetchFn: T;
  onSuccess?: (data: PromiseReturnType<T> | undefined) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: PromiseReturnType<T> | undefined, error: unknown) => void;
};

function userQuery<T extends (...args: any[]) => any>({
  fetchFn,
  onSuccess,
  onError,
  onSettled,
}: UseQueryProps<T>) {
  const [data, setData] = useState<PromiseReturnType<T> | undefined>();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);

  const query = async () => {
    try {
      setIsLoading(true);

      const fetchData = await fetchFn();

      setData(fetchData);
      onSuccess && onSuccess(data);
    } catch (_error) {
      setError(_error);
      onError && onError(_error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading === false) {
      onSettled && onSettled(data, error);
    }
  }, [data, error, isLoading, onSettled]);

  useEffect(() => {
    query();
  }, []);

  return { isLoading, refetch: query, data, error };
}

export default userQuery;
