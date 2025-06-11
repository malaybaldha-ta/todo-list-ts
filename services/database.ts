import * as SQLite from 'expo-sqlite';
import { Todo } from '../types';

// --- Open the Database ---
const db = SQLite.openDatabaseSync('todos.db');

// --- Setup Function ---
export const setupDatabaseAsync = async () => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS todos (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL,
      completedAt INTEGER
    );`
  );
  console.log("Database setup complete.");
};

// --- CRUD Functions ---
export const getAllTodosAsync = async (): Promise<Todo[]> => {
  const allRows = await db.getAllAsync<Todo>('SELECT * FROM todos ORDER BY id DESC');
  // SQLite stores booleans as 0 or 1, so we need to convert them back.
  return allRows.map((row: Todo) => ({
    ...row,
    completed: Boolean(row.completed),
  }));
};

export const addTodoAsync = async (todo: Todo) => {
  await db.runAsync(
    'INSERT INTO todos (id, title, completed, completedAt) VALUES (?, ?, ?, ?)',
    todo.id,
    todo.title,
    todo.completed ? 1 : 0,
    todo.completedAt || null
  );
};

export const toggleTodoAsync = async (id: string, completed: boolean, completedAt: number | null) => {
  await db.runAsync(
    'UPDATE todos SET completed = ?, completedAt = ? WHERE id = ?',
    completed ? 1 : 0,
    completedAt,
    id
  );
};

export const editTodoAsync = async (id: string, title: string) => {
  await db.runAsync('UPDATE todos SET title = ? WHERE id = ?', title, id);
};

export const deleteTodoAsync = async (id: string) => {
  await db.runAsync('DELETE FROM todos WHERE id = ?', id);
};

export const clearAllTodosAsync = async () => {
  await db.runAsync('DELETE FROM todos');
};