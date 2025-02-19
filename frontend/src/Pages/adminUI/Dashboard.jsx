import { useEffect, useState } from "react";
import baseApi from "../../utils/api";
baseApi

const Dashboard = () => {

  const [users, setusers] = useState([]);

  useEffect(() => {
      const fetchUsers = async () => {
         const req = await baseApi.get('/getUsers');
         console.log(req);  
      }
  }, [])
  return (
    <div>
      admin dashbaord
    </div>
  )
};


export default Dashboard