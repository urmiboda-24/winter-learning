import { Provider } from "react-redux";
import "./App.css";
import AddTodo from "./page/Todo/component/addTodo";
import TodoList from "./page/Todo/component/listTodo";
import { persister, store } from "./store/rootStore";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <h1>Todo App With Redux Toolkit</h1>
        <AddTodo />
        <TodoList />
      </PersistGate>
    </Provider>
  );
}

export default App;
