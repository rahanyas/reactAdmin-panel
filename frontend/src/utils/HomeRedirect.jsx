import { useNavigate } from "react-router-dom"
import useUser from "../context/UserContext"
import { useEffect } from "react"


const HomeRedirect = () => {

  const {user} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate('/home')
    }else{
      navigate('/login')
    }
  }, [user, navigate])
  return (
    null
  )
}

export default HomeRedirect