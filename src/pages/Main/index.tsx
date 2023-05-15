import Header from '../../components/Header';
import InputTodo from '../../components/InputTodo';
import TodoList from '../../components/TodoList';
import useGetTodos from '../../hooks/todos/useGetTodos';

import styles from './Main.module.css';

function Main() {
  const { todos, setTodos } = useGetTodos();

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Header />
        <InputTodo setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default Main;
