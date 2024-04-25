import React from 'react';

const ToDoList = () => {
  const [newTask, setNewTask] = React.useState('');
  const [tasks, setTasks] = React.useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : ['Bem-vindos!'];
  });

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (event) => {
    event.preventDefault();
    setNewTask(event.target.value);
  };

  const addTasks = () => {
    if (newTask === '') {
      return;
    }

    setTasks((prev) => [...prev, newTask]);
    setNewTask('');
  };

  const removeTasks = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const moveTaskUp = (index) => {
    if (index === 0 || tasks.length === 1) {
      return;
    }
    const updatedTasks = [...tasks];

    const temp = updatedTasks[index - 1];
    updatedTasks[index - 1] = updatedTasks[index];
    updatedTasks[index] = temp;

    setTasks(updatedTasks);
  };

  const moveTaskDown = (index) => {
    if (index === tasks.length - 1 || tasks.length === 1) {
      return;
    }
    const updatedTasks = [...tasks];

    const temp = updatedTasks[index + 1];
    updatedTasks[index + 1] = updatedTasks[index];
    updatedTasks[index] = temp;

    setTasks(updatedTasks);
  };

  return (
    <div className="ToDoList">
      <div className="Introduction">
        <h1>
          Omena's To-Do List<span>enjoy!</span>
        </h1>
      </div>

      <div className="InputArea">
        <form
          action=""
          onSubmit={(event) => {
            event.preventDefault();
            addTasks();
          }}
        >
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleChange}
          />
          <button onClick={addTasks}>+</button>
        </form>
      </div>

      <ul className="TaskItems">
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              <span>{task}</span>
              <div>
                <button onClick={() => moveTaskUp(index)}>&lt;</button>
                <button onClick={() => moveTaskDown(index)}>&gt;</button>
                <button onClick={() => removeTasks(index)}>X</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
