import { useEffect, useState } from 'react';

type ArgsType<T> = T extends (...args: infer U) => any ? U : never;
type PromiseReturnType<T> = T extends (...args: any[]) => Promise<infer R> ? R : never;

type UseMutateProps<T extends (...args: any[]) => Promise<any>> = {
  fetchFn: T;
  onSuccess?: (data: PromiseReturnType<T>) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: PromiseReturnType<T> | undefined, error: unknown) => void;
};

function useMutate<T extends (...args: any[]) => Promise<any>>({
  fetchFn,
  onSuccess,
  onError,
  onSettled,
}: UseMutateProps<T>) {
  const [data, setData] = useState<PromiseReturnType<T>>();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (...args: ArgsType<T>) => {
    try {
      setIsLoading(true);

      const fetchData = await fetchFn(...args);

      setData(fetchData);
      onSuccess && onSuccess(fetchData);
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
  }, [data, error, isLoading]);

  return { isLoading, mutate, data, error };
}

export default useMutate;
