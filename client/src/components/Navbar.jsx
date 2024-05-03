import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
      const {isAuthenticated, logout, user} = useAuth();
  return (
    <>
      
    <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg'>
    {!isAuthenticated && 
    <Link to={
        isAuthenticated ? "/tasks" : "/login"
    }>
        <h1 className='text-2xl font-bold'>Tasks Manager</h1>
    </Link> 
    }
</nav>
{isAuthenticated && 
    <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg'>
        {/* <Link to={
            isAuthenticated ? "/tasks" : "/"
        }>
            <h1 className='text-2xl font-bold'>Tasks Manager</h1>
        </Link> */}
        
        <ul className='flex gap-x-2'>
         
           <>
             <li>
                Welcome {user?.username} |
            </li>
             <li>
                <Link to="/add-task" className='bg-indigo-500 px-4 py-1 rounded-sm'>Add task</Link>
            </li>
            <li>
                <Link to="/login" onClick={()=>{logout()}}>Logout</Link>
            </li>
            </>
          
        </ul>
    </nav>
      }
    </>
  )
}

export default Navbar