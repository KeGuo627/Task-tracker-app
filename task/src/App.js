import { useState, useEffect } from "react";

import Header from "./component/Header";
import Tasks from "./component/Tasks";
import AddTask from "./component/AddTask";

import "./App.css";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  //page loading
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);
  //Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8000/tasks");
    const data = await response.json();
    return data;
  };

  //Fetch Task(for toggle reminder, update the reminder)
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:8000/tasks/${id}`);
    const data = await response.json();
    return data;
  };

  //Add Task
  const addTask = async (task) => {
    const response = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    setTasks([...tasks, data]);

    //dev server solution,above is json server
    //const id = Math.floor(Math.random() * 10000) + 1;
    //const newTask = { id, ...task };
    //setTasks([...tasks, newTask]);
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    //data: updated task
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <div className="App">
      <Header
        onAddButton={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {/*<Tasks tasks={tasks} onDelete={deleteTask} />*/}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks To Show"
      )}
    </div>
  );
}

export default App;
