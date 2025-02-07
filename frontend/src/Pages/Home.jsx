import Navbar from "../components/Navbar";
import useUser from "../context/UserContext";

const Home = () => {
  const {user} = useUser()
  return (
    <div>
       <Navbar />
       {user && <div>
            <h1>{user.name}</h1>
       </div> }
    </div>
  )
};

export default Home