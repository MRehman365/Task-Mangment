import React, { useState } from 'react';

let Dashboard;

Dashboard = ({ user }) => {
  const users = ['Alice', 'Bob', 'Charlie', 'Dave'];

  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, title: 'High - Low-fidelity wireframes', date: 'Tomorrow', description: 'Create first draft for client presentation...', priority: 'high', assignedTo: 'Alice' },
      { id: 2, title: 'Copy for website', date: '2', description: 'Create content for Convo Marketing...', priority: 'normal', assignedTo: 'Bob' },
    ],
    inProgress: [
      { id: 1, title: 'Preparation icon pack', date: '2', description: 'Create first icon pack, and add it to...', priority: 'normal', assignedTo: 'Charlie' },
      { id: 2, title: 'UI Design System', date: '1', description: 'Design system for Convo Web app!', priority: 'easy', assignedTo: 'Dave' },
    ],
    done: [
      { id: 1, title: 'Medium - Low-fidelity wireframes', date: 'Feb 3, 2023', description: 'Create first draft for client presentation...', priority: 'high', assignedTo: 'Alice' },
      { id: 2, title: 'High - Low-fidelity wireframes', date: 'Feb 12, 2023', description: 'Create first draft for client presentation...', priority: 'normal', assignedTo: 'Bob' },
    ],
    blocked: [
      { id: 1, title: 'High - Presentation for meeting', date: '2', description: 'Create first presentation for meeting with...', priority: 'high', assignedTo: 'Charlie' },
    ]
  });

  const [showPopup, setShowPopup] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', date: '', priority: 'normal', assignedTo: '' });
  const [taskType, setTaskType] = useState('todo'); // Default task type is 'todo'

  const handleAddTaskClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks(prevTasks => ({
      ...prevTasks,
      [taskType]: [
        ...prevTasks[taskType],
        { id: Date.now(), ...newTask }
      ]
    }));
    setNewTask({ title: '', description: '', date: '', priority: 'normal', assignedTo: '' });
    setShowPopup(false);
  };

  const handlePickTask = (taskId) => {
    const taskToMove = tasks.todo.find(task => task.id === taskId);
    setTasks(prevTasks => ({
      ...prevTasks,
      todo: prevTasks.todo.filter(task => task.id !== taskId),
      inProgress: [...prevTasks.inProgress, taskToMove]
    }));
  };

  const handleDoneTask = (taskId) => {
    const taskToMove = tasks.inProgress.find(task => task.id === taskId);
    setTasks(prevTasks => ({
      ...prevTasks,
      inProgress: prevTasks.inProgress.filter(task => task.id !== taskId),
      done: [...prevTasks.done, taskToMove]
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-[red]';
      case 'normal':
        return 'bg-orange-100 text-[orange]';
      case 'easy':
        return 'bg-green-100 text-[green]';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="sm:p-1 md:p-4 w-full">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="flex justify-between items-center mb-6">
      <p className="text-lg mb-6">Hello, {user ? user.email.split('@')[0] : 'Guest'}!</p>
        <h2 className="text-lg font-bold">Task Management</h2>
        <button onClick={handleAddTaskClick} className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
        {['todo', 'inProgress', 'done', 'blocked'].map((type) => (
          <div key={type}>
            <h3 className="text-lg font-bold mb-4 capitalize">{type}</h3>
            <div className=" p-2">
              {tasks[type].map(task => (
                <div key={task.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                  <p className={`inline-block px-3 py-1 text-sm rounded ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </p>
                  <h4 className="text-lg font-bold mb-2">{task.title}</h4>
                  <p className="text-gray-600 mb-2">{task.description}</p>
                  <p className="text-gray-400 mb-2">{task.date}</p>
                  {type === 'todo' && (
                    <button onClick={() => handlePickTask(task.id)} className="bg-[#744df7] text-[#ffffff] px-3 py-1 rounded mt-2">Pick</button>
                  )}
                  {type === 'inProgress' && (
                    <button onClick={() => handleDoneTask(task.id)} className="bg-green-500 text-white px-2 py-1 rounded mt-2">Done</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:[100%] md:w-[50%]">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newTask.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Priority</label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="easy">Low</option>
                  <option value="normal">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Assign to</label>
                <select
                  name="assignedTo"
                  value={newTask.assignedTo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                >
                  {users.map(user => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Task Type</label>
                <select
                  name="taskType"
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="done">Done</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePopupClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
