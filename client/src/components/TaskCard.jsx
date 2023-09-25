import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
dayjs.extend(utc);

/* eslint-disable react/prop-types */
const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md p-10 w-full rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl fnt-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-d rounded-md"
          >
            delete
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-d rounded-md"
          >
            edit
          </Link>
        </div>
      </header>
      <p>{task.description}</p>
      {/* <p>{new Date(task.date).toLocaleDateString()}</p> */}
      <p>{dayjs(task.date).utc().format('DD/MM/YYYY')}</p>
    </div>
  );
};

export default TaskCard;
