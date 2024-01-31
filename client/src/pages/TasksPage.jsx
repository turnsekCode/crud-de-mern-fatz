import { useEffect } from 'react'
import { useTasks } from '../context/TasksContext'
import TaskCard from '../components/TaskCard'

const TasksPage = () => {
  const {getTasks, tasks} = useTasks()
  useTasks

  useEffect(()=>{
    getTasks()
  }, [])

  if (tasks.length === 0) return (<h1>No hay tareas</h1>)

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  )
}

export default TasksPage