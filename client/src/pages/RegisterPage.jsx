import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/auth';

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const myHandleSubmit = handleSubmit(async (values) => {
    // console.log(values);
    const res = await registerRequest(values);
    console.log(res);
  });

  return (
    <div className="bg-zinc-700 max-w-md p-10 rounded-md mx-auto m-10">
      <form onSubmit={myHandleSubmit}>
        <input
          type="text"
          {...register('username', { required: true })}
          className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        <input
          type="password"
          {...register('password', { required: true })}
          className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
