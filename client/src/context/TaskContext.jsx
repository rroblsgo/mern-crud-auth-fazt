/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
} from '../api/tasks';

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within an TaskProvider');
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
      // console.log('tasks: ', res.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log('res: ', res);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
