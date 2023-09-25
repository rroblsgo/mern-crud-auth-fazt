/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskContext';

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return <h1>No hay tareas.</h1>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}

export default TasksPage;
