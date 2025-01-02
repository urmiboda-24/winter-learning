import { Provider } from "react-redux";
import "./App.css";
import AddTodo from "./page/Todo/component/addTodo";
import TodoList from "./page/Todo/component/listTodo";
import { store } from "./store/rootStore";

function App() {
  return (
    <Provider store={store}>
      <h1>Todo App With Redux Toolkit</h1>
      <AddTodo />
      <TodoList />
    </Provider>
  );
}

export default App;
