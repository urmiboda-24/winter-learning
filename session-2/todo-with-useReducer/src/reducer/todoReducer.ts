export interface ITodoState {
  title: string;
  isRead: boolean;
  id: number;
}

type ITodoAction =
  | {
      type: "TODO_ADD";
      payload: { title: string; isRead: boolean };
    }
  | {
      type: "TODO_REMOVE";
      payload: string;
    }
  | {
      type: "TODO_READ";
      payload: string;
    }
  | {
      type: "TODO_EDIT";
      payload: { id: number; title: string };
    };

const todoReducer = (state: ITodoState[], action: ITodoAction) => {
  switch (action.type) {
    case "TODO_ADD":
      const newTodo = {
        ...action.payload,
        id: Math.floor(Math.random() * 100 + 1),
      };
      return [...state, newTodo];
    case "TODO_REMOVE":
      return state.filter((todo) => todo.title !== action.payload);
    case "TODO_READ":
      return state.map((item) =>
        item.title === action.payload ? { ...item, isRead: true } : item
      );
    case "TODO_EDIT":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, title: action.payload.title }
          : item
      );
    default:
      return state;
  }
};

export default todoReducer;
