import { API_URL } from '../constants/Api';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export const getTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  const data = await response.json();
  return data;
};

export const createTask = async (task: Omit<Task, "id">) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return await response.json();
};


export const updateTask = async (task: Task) => {
  const response = await fetch(`${API_URL}/tasks/${task.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

export const deleteTask = async (id: number) => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
};