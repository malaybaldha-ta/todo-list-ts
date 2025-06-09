import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types';

interface TodoState {
    items: Todo[];
}

const initialState: TodoState = {
    items: [],
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: Math.random().toString(),
                title: action.payload.trim(),
                completed: false,
                completedAt: null,
            };
            state.items.unshift(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.items.find(t => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                todo.completedAt = todo.completed ? Date.now() : null;
            }
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(t => t.id !== action.payload);
        },
        editTodo: (state, action: PayloadAction<{ id: string; title: string }>) => {
            const { id, title } = action.payload;
            const todo = state.items.find(t => t.id === id);
            if (todo) {
                todo.title = title.trim();
            }
        },
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.items = action.payload;
        }
    },
})

export const { addTodo, toggleTodo, deleteTodo, editTodo, setTodos} = todoSlice.actions;
export default todoSlice.reducer;
