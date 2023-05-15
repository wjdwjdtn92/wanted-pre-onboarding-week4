import { FaSpinner, FaTrash } from 'react-icons/fa';
import React from 'react';

import { TodoType } from '../types';
import { ALERT_MESSAGE } from '../constants/message';
import useDeleteTodo from '../hooks/todos/useDeleteTodo';

type TodoItemProps = TodoType & {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

function TodoItem({ id, title, setTodos }: TodoItemProps) {
  const { mutate: deleteTodoMutate, isLoading } = useDeleteTodo({
    onSuccess: () => {
      setTodos((prev) => prev.filter((item) => item.id !== id));
    },
    onError: (error) => {
      console.error(error);
      alert(ALERT_MESSAGE.ERROR);
    },
  });

  const handleRemoveTodo = async () => {
    await deleteTodoMutate(id);
  };

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button type="button" onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
}

export default TodoItem;
