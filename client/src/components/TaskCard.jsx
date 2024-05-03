import React from 'react';
import { useTasks } from '../context/TasksContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();

  return (
    <div className='bg-zinc-800 max-w-md w-full p-5 rounded-md my-2'>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>{task.title}</h1>
        <div>
          <button onClick={() => { deleteTask(task._id) }} className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-sm mr-2 my-2'>delete</button>
          <Link to={`/tasks/${task._id}`} className='bg-indigo-500 px-4 py-1 rounded-sm'>edit</Link>
        </div>
      </header>
      <p className='text-slate-300'>{task.description}</p>
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
      <div>
        <h2>Vista previa del archivo</h2>
        {/* Mostrar la vista previa de cada archivo */}
        {task.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Preview`}
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
