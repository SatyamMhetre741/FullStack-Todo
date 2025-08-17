const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api/todo';

export async function fetchTodos() {
  const res = await fetch(`${API_BASE}/items`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function createTodo({ title, date }) {
  const res = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, date, completed: false })
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}
