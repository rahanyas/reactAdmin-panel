import { Link, useNavigate } from "react-router-dom";
import useUser from "../context/UserContext";


const Navbar = () => {

  const {setUser} = useUser() ;
  const Navigate = useNavigate()

  const handleLogout = () => {
         localStorage.removeItem('user');
         setUser(null)
         Navigate('/');
         console.log('user loged out');    
  }

  return (
    
    <div className="flex justify-between p-4 bg-gray-200">
   
      <Link to='/home'>
      <h1 className="capitalize font-semibold">home page</h1>
      </Link>
      <div className="flex items-center gap-4">      
      <Link to='/cart'>
       <button className="border-2 rounded-full px-4 py-2 uppercase font-semibold cursor-pointer hover:bg-white  transition ease-in duration-300">cart</button>
      </Link>
      <button className="border-2 p-2 rounded-full cursor-pointer capitalize font-semibold hover:bg-white  transition ease-in duration-300" onClick={handleLogout}>log out</button>
        </div>

    </div>



  )
};

export default Navbar;