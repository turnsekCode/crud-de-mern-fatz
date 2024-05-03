import axios from "./axios";

export const getTasksRequest = () => axios.get("/tasks");

export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);

//export const createTaskRequest = (task) => axios.post("/tasks", task);
export const createTaskRequest = async (task) => {
    return await axios.post("/tasks", task, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

export const updateTaskRequest = async (id, task) => {
  return await axios.put("/tasks/" + id, task, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDeleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);
