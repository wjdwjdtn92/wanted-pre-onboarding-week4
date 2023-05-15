import { createTodo } from '../../api/todo';
import { TodoType } from '../../types';
import useMutate from '../useMutate';

type UseCreateTodoProps = {
  onSuccess?: (data: TodoType) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: TodoType, error: unknown) => void;
};

function useCreateTodo({ onSuccess, onError, onSettled }: UseCreateTodoProps = {}) {
  const { mutate, isLoading } = useMutate({
    fetchFn: createTodo,
    onSuccess,
    onError,
    onSettled,
  });

  return { isLoading, mutate };
}

export default useCreateTodo;
