import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "./type";

const fetchTodoFromAPI = async (): Promise<Todo[]> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, text: "Learn Redux", completed: false },
          { id: 2, text: "Build a Todo App", completed: true },
        ]),
      1000
    )
  );
};

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async () => {
  const response = await fetchTodoFromAPI();
  return response;
});
