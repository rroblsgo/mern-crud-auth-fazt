/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
dayjs.extend(utc);

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    tasks,
    createTask,
    getTask,
    updateTask,
    errors: taskErrors,
  } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  console.log(tasks);

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue('title', task.title);
        setValue('description', task.description);
        setValue('date', dayjs(task.date).utc().format('YYYY-MM-DD'));
      }
    }
    loadTask();
  }, []);

  const myHandleSubmit = handleSubmit(async (data) => {
    console.log(data);
    if (!data.date) data.date = Date.now();
    console.log(data);
    if (params.id) {
      updateTask(params.id, {
        ...data,
        date: dayjs(data.date).utc().format(),
      });
    } else {
      createTask({
        ...data,
        date: dayjs(data.date).utc().format(),
      });
    }
    navigate('/tasks');
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 w-full rounded-md m-10">
        <h1 className="text-2xl font-bold mb-2">Add Task</h1>
        {taskErrors &&
          taskErrors.map((error, i) => (
            <p className="bg-red-500 rounded-md p-2 mb-2 text-white" key={i}>
              {error}
            </p>
          ))}
        <form onSubmit={myHandleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            {...register('title', { required: true })}
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.title && (
            <p className="text-red-500 rounded-md px-2 py-1">
              Title es requerido
            </p>
          )}
          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            placeholder="Description"
            {...register('description', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 rounded-md px-2 py-1">
              Description es requerido
            </p>
          )}
          <label htmlFor="date">Date</label>
          <input
            type="date"
            placeholder="Title"
            {...register('date')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
