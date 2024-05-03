import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, getDeleteTaskRequest, getTaskRequest, updateTaskRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context){
        throw new Error("useTasks must be used within a TaskProvider")
    }
    return context;
}

export function TaskProvider({children}){

    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
      try {
         const res = await getTasksRequest()
       setTasks(res.data)
      } catch (error) {
        console.error(error)
      }
       
    }

    // const createTask = async (task) => {
    //     const res = await createTaskRequest(task)
    //     console.log(res)
    // }
    const createTask = async (task) => {
       // console.log(task)
        try {
          const res = await createTaskRequest(task)
         // console.log("res", res)
          setTasks([...tasks, res.data]);
        } catch (error) {
          console.log(error);
        }
      };

     const deleteTask = async (id) => {
        try {
            const res = await getDeleteTaskRequest(id) 
            if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))
        } catch (error) {
              console.log(res)
        }
       
      
    }

    const getTask = async (id) => {
       try {
        const res = await getTaskRequest(id)
        return res.data;
       } catch (error) {
        console.log(error)
       }
    }
    const updateTask = async (id, task) => {
        try {
          const res = await updateTaskRequest(id, task);
          setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
        } catch (error) {
          console.log(error);
        }
      };

    return ( 
    <TaskContext.Provider value={{tasks,createTask,getTasks,deleteTask,getTask,updateTask}}>
        {children}
    </TaskContext.Provider>
    )
}