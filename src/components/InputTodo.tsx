import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import React, { useCallback, useEffect, useState } from 'react';

import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { TodoType } from '../types';
import { ALERT_MESSAGE } from '../constants/message';

type InputTodoProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

function InputTodo({ setTodos }: InputTodoProps) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus<HTMLInputElement>();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    async (evnet: React.FormEvent<HTMLFormElement>) => {
      try {
        evnet.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          alert(ALERT_MESSAGE.EMPTY);
          return;
        }

        const { data } = await createTodo(trimmed);

        if (data) {
          setTodos((prev) => [...prev, data]);
          return;
        }
      } catch (error) {
        console.error(error);
        alert(ALERT_MESSAGE.ERROR);
      } finally {
        setInputText('');
        setIsLoading(false);
      }
    },
    [inputText, setTodos],
  );

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
