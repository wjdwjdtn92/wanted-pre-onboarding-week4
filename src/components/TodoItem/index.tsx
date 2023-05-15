import React from 'react';

import { TodoType } from '../../types';
import { ALERT_MESSAGE } from '../../constants/message';
import useDeleteTodo from '../../hooks/todos/useDeleteTodo';

import styles from './TodoItem.module.css';
import TrashButton from '../shared/TrashButton';
import LoadingSpinner from '../shared/LoadingSpinner';

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
    <li className={styles.item}>
      <span>{title}</span>
      <div className={styles['item-option']}>
        {!isLoading ? <TrashButton onClick={handleRemoveTodo} /> : <LoadingSpinner />}
      </div>
    </li>
  );
}

export default TodoItem;
