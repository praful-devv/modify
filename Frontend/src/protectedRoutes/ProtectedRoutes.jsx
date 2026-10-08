import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {

  const { user, isLoading } = useSelector((store) => store.auth);

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default ProtectedRoutes