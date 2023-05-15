import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

import useFocus from '../hooks/useFocus';
import { TodoType } from '../types';
import { ALERT_MESSAGE } from '../constants/message';
import useCreateTodo from '../hooks/todos/useCreateTodo';

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
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      {!isLoading ? (
        <button className="input-submit" type="submit">
          <FaPlusCircle className="btn-plus" />
        </button>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </form>
  );
}

export default InputTodo;
