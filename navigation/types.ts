import Todo from '@types';

export type RootStackParamList = {
    TodoList: undefined;
    AddTodo: undefined;
    EditTodo: {
        todo: Todo;
    }
    History: undefined;
    Settings: undefined;
}