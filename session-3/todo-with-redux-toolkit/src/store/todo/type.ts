export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoInitialState {
  list: Todo[];
  isLoading: boolean;
  error: null;
}
