/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
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
  const [errors, setErrors] = useState([]);

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
    try {
      const res = await createTaskRequest(task);
      console.log('res: ', res);
      setErrors([]);
    } catch (error) {
      console.log('errors: ', error);
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
        errors,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
