import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signup, errors: registerErrors} = useAuth();
    const navigate = useNavigate();



    const onSubmit = handleSubmit(async(values)=>{
           signup(values)
           navigate('/login')
        })
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {
            registerErrors.map((error, i) => (
                <div key={i} className="bg-red-500 p-2 text-white">{error}</div>
            ))
        }
        <h1 className='text-2xl font-bold'>Register</h1>
        <form onSubmit={onSubmit}>
            <input type="text" {... register("username", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3" placeholder="user" />
            {errors.username && (<p className="text-red-500">username is required</p>)}
            <input type="email" {... register("email", {required: true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3" placeholder="email"/>
            {errors.email && (<p className="text-red-500">email is required</p>)}
            <input type="password" {... register("password", {required: true})}  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-3" placeholder="password"/>
            {errors.password && (<p className="text-red-500">password is required</p>)}
            <button type="submit" className="bg-sky-500 text-white px-4 py-2 rounded-md my-2">
                Register
            </button>
        </form>
        <p className='flex gap-x-2 justify-between'>Ya tienes cuenta? <Link to="/login" className='text-sky-500'>Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage