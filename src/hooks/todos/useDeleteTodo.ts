import { deleteTodo } from '../../api/todo';
import { TodoType } from '../../types';
import useMutate from '../useMutate';

type UseDeleteTodoProps = {
  onSuccess?: (data: TodoType) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: TodoType, error: unknown) => void;
};

function useDeleteTodo({ onSuccess, onError, onSettled }: UseDeleteTodoProps = {}) {
  const { mutate, isLoading } = useMutate({
    fetchFn: deleteTodo,
    onSuccess,
    onError,
    onSettled,
  });

  return { isLoading, mutate };
}

export default useDeleteTodo;
