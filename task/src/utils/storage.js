export const getUsers = () => {
  const stored = localStorage.getItem("users");
  if (!stored) {
    const defaultUsers = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "user1", password: "user123", role: "user" },
      { username: "user2", password: "user123", role: "user" },
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(stored);
};

export const getTasks = () => {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getCurrentUser = () => {
  const stored = localStorage.getItem("currentUser");
  return stored ? JSON.parse(stored) : null;
};

export const saveCurrentUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem("currentUser");
};
