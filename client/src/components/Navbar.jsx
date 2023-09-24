import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  // console.log('desde Navbar: ', isAuthenticated, user);
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between px-10 py-5 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? '/tasks' : '/'}>Task Manager</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Welcome <span className="text-indigo-400 px-2">{user.email}</span>
            </li>
            <li>
              <Link
                to="/add-task"
                className="bg-indigo-500 px-4 py-2 rounded-md"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
                className="bg-indigo-500 px-4 py-2 rounded-md"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-2 rounded-md">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-2 rounded-md"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
