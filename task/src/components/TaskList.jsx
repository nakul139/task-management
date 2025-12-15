import React from "react";
import { getTasks, saveTasks } from "../utils/storage";

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete, isAdmin }) => {
  const handleStatusToggle = (taskId) => {
    const allTasks = getTasks();
    const updated = allTasks.map((t) =>
      t.id === taskId
        ? { ...t, status: t.status === "pending" ? "completed" : "pending" }
        : t
    );
    saveTasks(updated);
    onTaskUpdate();
  };

  const handleDelete = (taskId) => {
    const allTasks = getTasks();
    const filtered = allTasks.filter((t) => t.id !== taskId);
    saveTasks(filtered);
    onTaskDelete();
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("taskId", task.id);
  };

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">No tasks available</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            draggable={isAdmin}
            onDragStart={(e) => handleDragStart(e, task)}
            className={`bg-white rounded-lg shadow-md p-4 ${
              isAdmin ? "cursor-move hover:shadow-lg" : ""
            } transition-shadow`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Assigned to: {task.assignedTo}
                </p>
              </div>

              <div className="flex gap-2 ml-4">
                {!isAdmin && (
                  <button
                    onClick={() => handleStatusToggle(task.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      task.status === "completed"
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    }`}
                    title={
                      task.status === "completed"
                        ? "Mark as Pending"
                        : "Mark as Completed"
                    }
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {task.status === "completed" ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
                        />
                      )}
                    </svg>
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="Delete Task"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
