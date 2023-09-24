import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { tasks, createTask } = useTasks();
  const navigate = useNavigate();
  console.log(tasks);

  const myHandleSubmit = handleSubmit((data) => {
    createTask(data);
    navigate('/tasks');
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10 w-full rounded-md m-10">
      <form onSubmit={myHandleSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register('title', { required: true })}
          autoFocus
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <textarea
          rows="3"
          placeholder="Description"
          {...register('description')}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage;
