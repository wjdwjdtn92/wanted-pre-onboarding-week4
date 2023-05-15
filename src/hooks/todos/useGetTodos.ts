import { useEffect, useState } from 'react';
import { getTodoList } from '../../api/todo';
import { TodoType } from '../../types';
import userQuery from '../useQuery';

type UseGetTodosProps = {
  onSuccess?: (data: TodoType) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: TodoType, error: unknown) => void;
};

function useGetTodos({ onSuccess, onError, onSettled }: UseGetTodosProps = {}) {
  const { data, isLoading, error } = userQuery({
    fetchFn: getTodoList,
    onSuccess,
    onError,
    onSettled,
  });

  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  return { isLoading, todos, setTodos, error };
}

export default useGetTodos;
