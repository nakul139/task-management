import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getTasks } from "../utils/storage";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import UserList from "./UserList";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState(getTasks());
  const { logout } = useAuth();

  const refreshTasks = () => {
    setTasks(getTasks());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Manage tasks and assignments
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TaskForm onTaskCreated={refreshTasks} />
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                All Tasks
              </h2>
              <TaskList
                tasks={tasks}
                onTaskUpdate={refreshTasks}
                onTaskDelete={refreshTasks}
                isAdmin={true}
              />
            </div>
          </div>

          <div>
            <UserList onTaskDrop={refreshTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
