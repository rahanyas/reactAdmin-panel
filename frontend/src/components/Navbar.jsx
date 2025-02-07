import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between p-4 bg-gray-200">
      <Link to='/home'>
      <h1 className="capitalize font-semibold">home page</h1>
      </Link>
      <button className="border-2 p-2 rounded-full cursor-pointer capitalize font-semibold">log out</button>
    </div>
  )
};

export default Navbar;