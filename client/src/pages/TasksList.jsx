import { useAuth } from '../context/AuthContext';
const TasksList = () => {
  const { user, isAuthenticated } = useAuth();
  console.log(user);
  return (
    <div>
      <h1 className="text-2xl font-bold py-2 m-2">Lista de Tareas</h1>
      {isAuthenticated && (
        <div className="w-2/3 px-4 py-3 mx-2 bg-slate-900">
          <p className="text-red-700 text-lg mx-2">{user.message} </p>
          <p>Usuario: {user.user.username}</p>
          <p>Email: {user.user.email} </p>
          <p>Fecha de Alta: {user.user.createdAt} </p>
        </div>
      )}
    </div>
  );
};

export default TasksList;
