import { combineReducers } from "redux";
import todoReducer from "./todo/slice";

const rootReducer = combineReducers({
  todos: todoReducer,
});

export type AuthState = ReturnType<typeof rootReducer>;

export default rootReducer;
