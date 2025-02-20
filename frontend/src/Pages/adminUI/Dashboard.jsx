import { useEffect, useState } from "react";
import baseApi from "../../utils/api";
import useAdmin from "../../context/AdminContext";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const {setAdmin} = useAdmin()

  useEffect(() => {
    const fetchUsers = async () => {
      const req = await baseApi.get("/admin/getUsers");
      setUsers(req.data.users);
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
       localStorage.removeItem('admin');
       setAdmin(null)
  };

  const handleBlock = async (id) => {
       console.log(id)
       const req = await baseApi.post('/admin/blockUser', {id});
      //  const res = req;
      //  console.log(res)
      if(req.status === 200){
        setUsers((prev) => prev.map((user) => user._id === id ? {... user, isBlocked : true} : user))
      }
  }

  const handleUnblock = async (id) => {
    console.log('unblock btn clickded');
    const req = await baseApi.post('/admin/unBlockUser', {id});
    if(req.status === 200){
      setUsers((prev) => prev.map((user) => user._id === id ? {...user, isBlocked : false} : user))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 relative">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <button className="absolute right-5 top-6 border px-4 py-2 rounded-full capitalize cursor-pointer hover:bg-gray-100 transition ease-in duration-300" onClick={handleLogout}>logout</button>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 text-center">
                    {user.isBlocked ? <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer" onClick={() => handleUnblock(user._id)}>
                      Unblock
                    </button> : <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600 cursor-pointer" onClick={() => handleBlock(user._id)}>
                      Block
                    </button> }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
