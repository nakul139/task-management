import React, { useState } from "react";
import { getUsers, getTasks, saveTasks } from "../utils/storage";

const UserList = ({ onTaskDrop }) => {
  const users = getUsers().filter((u) => u.role === "user");
  const [tasks, setTasks] = useState(getTasks());

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, username) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const allTasks = getTasks();
    const updated = allTasks.map((t) =>
      t.id === taskId ? { ...t, assignedTo: username } : t
    );
    saveTasks(updated);
    setTasks(updated);
    if (onTaskDrop) onTaskDrop();
  };

  const getTaskCount = (username) => {
    return tasks.filter((t) => t.assignedTo === username).length;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Users</h2>
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.username}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, user.username)}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-gray-800">
                  {user.username}
                </span>
              </div>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {getTaskCount(user.username)} tasks
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Drag tasks here to reassign
      </p>
    </div>
  );
};

export default UserList;
