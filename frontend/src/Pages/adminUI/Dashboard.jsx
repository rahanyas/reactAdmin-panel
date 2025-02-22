import { useEffect, useState } from "react";
import baseApi from "../../utils/api";
import useAdmin from "../../context/AdminContext";
import SearchInput from "../../components/SearchBox";
import PaginatedItems from "../../components/Pagination";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { setAdmin } = useAdmin();
  const [search, setSearch] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const req = await baseApi.get("/admin/getUsers");
      setUsers(req.data.users);
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  const handleBlock = async (id) => {
    const req = await baseApi.post('/admin/blockUser', { id });
    if (req.status === 200) {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked: true } : user
        )
      );
    }
  };

  const handleUnblock = async (id) => {
    const req = await baseApi.post('/admin/unBlockUser', { id });
    if (req.status === 200) {
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked: false } : user
        )
      );
    }
  };

  let filteredUser = search
    ? users.filter((user) =>
        user.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;

    const pageCount = Math.ceil(filteredUser.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const paginatedUsers = filteredUser.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = ({selected}) => {
      setCurrentPage(selected)
    }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 relative mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <SearchInput setSearch={setSearch} />
          <button
            className="border px-4 py-2 rounded-full capitalize cursor-pointer hover:bg-gray-100 transition ease-in duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6 text-center">
                    {user.isBlocked ? (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer"
                        onClick={() => handleUnblock(user._id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600 cursor-pointer"
                        onClick={() => handleBlock(user._id)}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  User not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PaginatedItems pageCount={pageCount} onPageChange={handlePageChange}/>
      </div>
    </div>
  );
};

export default Dashboard;
