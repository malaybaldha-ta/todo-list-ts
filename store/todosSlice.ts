import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Todo from '@types';
import * as db from '@services/database';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const todos = await db.getAllTodosAsync();
  return todos;
});

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (title: string) => {
  const newTodo: Todo = {
    id: `todo_${Date.now()}`,
    title: title,
    completed: false,
    completedAt: null,
  };
  await db.addTodoAsync(newTodo);
  return newTodo;
});

export const toggleExistingTodo = createAsyncThunk('todos/toggleTodo', async (todo: Todo) => {
  const newCompletedStatus = !todo.completed;
  const newCompletedAt = newCompletedStatus ? Date.now() : null;
  await db.toggleTodoAsync(todo.id, newCompletedStatus, newCompletedAt);
  return { id: todo.id, completed: newCompletedStatus, completedAt: newCompletedAt };
});

export const deleteExistingTodo = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  await db.deleteTodoAsync(id);
  return id; // Return the id of the deleted todo
});

export const editExistingTodo = createAsyncThunk('todos/editTodo', async (payload: { id: string; title: string }) => {
  await db.editTodoAsync(payload.id, payload.title);
  return payload;
});

export const clearAll = createAsyncThunk('todos/clearAll', async () => {
  await db.clearAllTodosAsync();
  return; // No value needs to be returned
});

export type FilterStatus = 'all' | 'active' | 'completed';
interface TodoState {
    items: Todo[];
    filterStatus: FilterStatus;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TodoState = {
    items: [],
    filterStatus: 'all',
    status: 'idle',
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<FilterStatus>) => {
            state.filterStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(addNewTodo.fulfilled, (state, action) => {
            state.items.push(action.payload);
        })
        .addCase(toggleExistingTodo.fulfilled, (state, action) => {
            const index = state.items.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.items[index].completed = action.payload.completed;
                state.items[index].completedAt = action.payload.completedAt;
            }
        })
        .addCase(deleteExistingTodo.fulfilled, (state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload);
        })
        .addCase(editExistingTodo.fulfilled, (state, action) => {
            const index = state.items.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.items[index].title = action.payload.title;
            }
        })
        .addCase(clearAll.fulfilled, (state) => {
            state.items = [];
        });
    },
});

export const { setFilter } = todoSlice.actions;
export default todoSlice.reducer;
