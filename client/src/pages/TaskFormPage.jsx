import {useForm} from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import {useNavigate, useParams} from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

const TaskFormPage = () => {
  const {register, handleSubmit, setValue}  = useForm();
  const {createTask, getTask, updateTask} = useTasks()
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=>{
   async function loadTask() {
    if (params.id){
      const task = await getTask(params.id);
      console.log(task)
      setValue('title', task.title)
      setValue('description', task.description)
    }
   }
     loadTask()
  }, [])
  
  const onSubmit = handleSubmit((data)=>{
   if (params.id){
    updateTask(params.id, {
       ...data,
      date: dayjs.utc(data.date).format()
    })
   } else {
     createTask({
      ...data,
      date: dayjs.utc(data.date).format()
     });
    
   }
    navigate('/tasks');
  })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md flex content-center justify-center'>
      <form onSubmit={onSubmit}>
        <label htmlFor='title'>title</label>
        <input type="text" placeholder="Title" 
        {...register("title")}
        autoFocus
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2'
        />
        <label htmlFor='description'>description</label>
        <textarea rows="3" placeholder="Description" {...register("description")} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md'></textarea>
        <label htmlFor='date'>date</label>
        <input type='date' {...register("date")} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2'/>
        <button className='bg-indigo-500 px-3 py-2 rounded-md'>Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage