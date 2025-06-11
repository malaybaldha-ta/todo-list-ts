export default interface Todo {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: number | null;
//   editText: string;
}
