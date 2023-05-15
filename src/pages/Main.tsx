import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import useGetTodos from '../hooks/todos/useGetTodos';

function Main() {
  // const [todoListData, setTodoListData] = useState<TodoType[]>([]);
  const { todos, setTodos } = useGetTodos();

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default Main;
