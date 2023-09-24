import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

/* eslint-disable react/prop-types */
const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md p-10 w-full rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl fnt-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button onClick={() => deleteTask(task._id)}>delete</button>
          <Link to={`/tasks/${task._id}`}>edit</Link>
        </div>
      </header>
      <p>{task.description}</p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskCard;
