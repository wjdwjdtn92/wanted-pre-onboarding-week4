import React, { useEffect, useState } from 'react';

import useFocus from '../../hooks/useFocus';
import { TodoType } from '../../types';
import { ALERT_MESSAGE } from '../../constants/message';
import useCreateTodo from '../../hooks/todos/useCreateTodo';

import styles from './InputTodo.module.css';
import LoadingSpinner from '../shared/LoadingSpinner';
import PlusButton from '../shared/PlusButton';

type InputTodoProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

function InputTodo({ setTodos }: InputTodoProps) {
  const [inputText, setInputText] = useState('');
  const { ref, setFocus } = useFocus<HTMLInputElement>();
  const { isLoading, mutate: createTodoMutate } = useCreateTodo({
    onSuccess: (data) => {
      setTodos((prev) => [...prev, data]);
    },
    onError: (error) => {
      console.error(error);
      alert(ALERT_MESSAGE.ERROR);
    },
    onSettled: () => {
      setInputText('');
    },
  });

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = async (evnet: React.FormEvent<HTMLFormElement>) => {
    evnet.preventDefault();

    const trimmed = inputText.trim();
    if (!trimmed) {
      alert(ALERT_MESSAGE.EMPTY);
      return;
    }

    await createTodoMutate(trimmed);
  };

  return (
    <form className={styles['form-container']} onSubmit={handleSubmit}>
      <input
        className={`${styles['input-text']} ${styles['input-common']}`}
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      {!isLoading ? <PlusButton className={styles['input-common']} /> : <LoadingSpinner />}
    </form>
  );
}

export default InputTodo;
