import React from 'react';
import { TodoType } from '../../types';
import TodoItem from '../TodoItem';

import styles from './TodoList.module.css';

type TodoListProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

function TodoList({ todos, setTodos }: TodoListProps) {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <div className={styles['empty-list']}>...</div>
  );
}
export default TodoList;
