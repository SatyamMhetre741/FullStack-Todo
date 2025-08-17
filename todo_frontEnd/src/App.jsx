import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useEffect, useState } from "react";
import { createTodo, fetchTodos } from "./services/api";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTodos();
        // API returns { message, todoItems }
        const items = data.todoItems?.map((t) => ({
          id: t._id,
          name: t.title,
          dueDate: t.date?.slice(0, 10),
          completed: t.completed,
        })) || [];
        setTodoItems(items);
      } catch (e) {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    try {
      const payload = { title: itemName, date: itemDueDate };
      const { todoItem } = await createTodo(payload);
      const newItem = {
        id: todoItem._id,
        name: todoItem.title,
        dueDate: todoItem.date?.slice(0, 10),
        completed: todoItem.completed,
      };
      setTodoItems((prev) => [newItem, ...prev]);
    } catch (e) {
      setError("Failed to add todo");
    }
  };

  const handleDeleteItem = (todoItemName) => {
    const newTodoItems = todoItems.filter((item) => item.name !== todoItemName);
    setTodoItems(newTodoItems);
  };

  return (
    <center className="todo-container">
      <AppName />
  <AddTodo onNewItem={handleNewItem} />
  {loading && <div>Loading...</div>}
  {error && <div style={{ color: 'red' }}>{error}</div>}
      {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}
      <TodoItems
        todoItems={todoItems}
        onDeleteClick={handleDeleteItem}
      ></TodoItems>
    </center>
  );
}

export default App;
