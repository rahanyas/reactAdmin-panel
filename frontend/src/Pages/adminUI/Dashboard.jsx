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
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600 cursor-pointer">
                    Block
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer">
                    Unblock
                  </button>
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
