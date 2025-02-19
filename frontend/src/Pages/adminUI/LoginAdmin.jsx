import { useState } from "react";
import useAdmin from "../../context/AdminContext";
import baseApi from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const navigate = useNavigate();

  const {setAdmin} = useAdmin();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
       try {
          const req = await baseApi.post('/admin/adminLogin', {
            userName, password
          });
       
          const json = req.data
          console.log(json);
          setIsError('');
          setAdmin(json.admin);
          navigate('/admin/dashboard')
      
       } catch (err) {
          console.log('admin login error', err);
          setIsError(err.response.data.msg)
       }
  }

  return (
    <div>
  
  <div>
    {isError && <div>
      {isError}
      </div>}
  </div>
   
    <form action="" className="flex flex-col gap-2 border items-center w-[500px] mx-auto mt-[100px] p-5 capitalize h-[300px] justify-center" onSubmit={handleLogin}> 
    <h1>admin login</h1>
      <input type="text" placeholder="enter userName" className="border p-2 rounded-md capitalize outline-none" onChange={(e) => setUserName(e.target.value)}/>
      <input type="password" placeholder="enter password" className="border p-2 rounded-md capitalize outline-none" onChange={(e) => setPassword(e.target.value)}/>
      <button type="submit" className="border p-3 rounded-md mt-5 cursor-pointer">Log in</button>
    </form>
    </div>
  )
};

export default AdminLogin

 