import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoInitialState } from "./type";
import { fetchTodo } from "./thunk";
import { REHYDRATE } from "redux-persist";

const initialState: TodoInitialState = {
  list: [],
  isLoading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id
            ? { ...item, text: action.payload.text }
            : item
        ),
      };
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        list: state.list.filter((todo) => todo.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(REHYDRATE, (state, action) => {
      console.log("Rehydrated state:", action.type);
    });
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
