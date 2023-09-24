/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, user, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks');
      window.location.href = '/tasks';
    }
  }, [isAuthenticated]);

  const myHandleSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-700 max-w-md p-10 w-full rounded-md m-10">
        <h1 className="text-2xl font-bold mb-2">Register</h1>
        {registerErrors &&
          registerErrors.map((error, i) => (
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
              Username es requerido
            </p>
          )}
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 rounded-md px-2 py-1">
              Email es requerido
            </p>
          )}
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 rounded-md px-2 py-1">
              Password es requerido
            </p>
          )}
          <button
            type="submit"
            className="bg-indigo-500 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300"
          >
            Register
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-sky-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
