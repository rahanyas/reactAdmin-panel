import { Link , useNavigate} from "react-router-dom";
import { useState } from "react";

import useUser from "../context/UserContext";

const SignIn = () => {
  
  const {setUser} = useUser();
  const Navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confimPass, setConfirmPass] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  
  if(password !== confimPass){
     setIsError('pass does not match');
    return;
  }
  setIsError('')
  const response = await fetch('http://localhost:9000/api/user/signup', {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({name, email, password})
  })
  const json = await response.json()
  console.log(json);
  if(!response.ok){
    setIsError(json.message)
  }
  setUser(json.user);
  Navigate('/home')
} catch (error) {
  setIsError(error.message)
}
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
       {isError && (
        <h1>{isError}</h1>
       )}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm your password"
            onChange={(e)=> setConfirmPass(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
