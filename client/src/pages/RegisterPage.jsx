/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, user, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated]);

  const myHandleSubmit = handleSubmit(async (values) => {
    // console.log(values);
    signup(values);
  });

  return (
    <div className="bg-zinc-700 max-w-md p-10 rounded-md mx-auto m-10">
      {RegisterErrors &&
        RegisterErrors.map((error, i) => (
          <p className="bg-red-500 rounded-md p-2 mb-2 text-white" key={i}>
            {error}
          </p>
        ))}
      <form onSubmit={myHandleSubmit}>
        <input
          type="text"
          {...register('username', { required: true })}
          className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        {errors.username && (
          <p className="text-red-500 rounded-md px-2 py-1">
            Username is required
          </p>
        )}
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 rounded-md px-2 py-1">Email is required</p>
        )}
        <input
          type="password"
          {...register('password', { required: true })}
          className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 rounded-md px-2 py-1">
            Password is required
          </p>
        )}
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
