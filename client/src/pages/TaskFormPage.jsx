/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { tasks, createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  console.log(tasks);

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue('title', task.title);
        setValue('description', task.description);
      }
    }
    loadTask();
  }, []);

  const myHandleSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
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
