import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseApi from "../../utils/api";
import useUser from "../../context/UserContext";
const Login = () => {

  const navigate = useNavigate();

   const {setUser} = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await baseApi.post('/user/login', {
        email, password});

        const json = response.data
        console.log(json);
        
        setIsError('');
        setUser(json.user)
        navigate('/home')
    } catch (error) {
      if(error.response){
        setIsError(error.response.data.msg)
      }else{
        setIsError(error.message)
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">Log In</h1>
        
        {/* Error message space */}
        {isError && (
          <div className="bg-red-200 text-red-600 p-2 rounded-lg mb-4 text-center">
            {isError}
          </div>
        )}
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)} 
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Enter your password" 
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Dont have an account? 
          <Link to='/signIn' className="text-blue-500 hover:underline ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
