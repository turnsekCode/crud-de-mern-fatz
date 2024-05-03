import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as Yup from "yup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TaskFormPage = () => {
  const { createTask, getTask, updateTask, tasks } = useTasks()
  const navigate = useNavigate();
  const params = useParams();
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState([]);
  //console.log(file)
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: [],
  });
  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getTask(params.id);
        setPost(post);
        //console.log(post)
        setPreview(post.images.map((image) => image.url));
      }
    })();
  }, [params.id, getTask]);

  //funcion que previzualiza la imagen antes de subirla
  const previewImage = (event) => {
    const selectedFiles = Array.from(event.target.files); // Convertir FileList a Array
    setFile(selectedFiles); // Actualizar el estado con los archivos seleccionados

    // Previsualizar cada archivo seleccionado
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(prevState => [...prevState, reader.result]); // Agregar la vista previa al estado
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md flex content-center justify-center'>
      <Formik
        initialValues={post}
        validationSchema={Yup.object({
          title: Yup.string().required("Titulo es requerido"),
          description: Yup.string().required("Descripcion es requerido"),
          // image: Yup.mixed().required("The image required"),
        })}
        onSubmit={async (values, actions) => {
          const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            // Agregar cada archivo al objeto FormData
            file.forEach((file) => {
              formData.append(`image`, file);
            });
          if (params.id) {
            await updateTask(params.id, formData);
          } else {
            await createTask(formData);
          }
          actions.resetForm();
          actions.setSubmitting(false);
          navigate("/tasks");
        }}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label
              htmlFor="title"
              className="text-sm block font-bold text-gray-400"
            >
              Title
            </label>
            <Field
              name="title"
              placeholder="title"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-2"
            ></Field>
            <ErrorMessage
              component="p"
              name="title"
              className="text-red-400 text-sm"
            />
            <label
              htmlFor="description"
              className="text-sm block font-bold text-gray-400"
            >
              Descripcion
            </label>
            <Field
              component="textarea"
              name="description"
              placeholder="description"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-2"
              rows={3}
            ></Field>
            <ErrorMessage
              component="p"
              name="description"
              className="text-red-400 text-sm"
            />
            <label
              htmlFor="description"
              className="text-sm block font-bold text-gray-400"
            >
              Descripcion
            </label>
            <input
              multiple
              type="file"
              name="image"
              className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              onChange={(e) => {
                previewImage(e);
                setFieldValue("image", e.target.files[0]);
              }}
            />
             {preview && (
                <div>
                  <h2>Vista previa del archivo</h2>
                  {/* Mostrar la vista previa de cada archivo */}
                  {preview.map((previewUrl, index) => (
                    <img
                      key={index}
                      src={previewUrl}
                      alt={`Preview ${index + 1}`}
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  ))}
                </div>
              )}
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 mt-2 rounded text-white focus:outline-none disabled:bg-indigo-400"
            >
              {isSubmitting ? (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
              ) : (
                "Save"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TaskFormPage