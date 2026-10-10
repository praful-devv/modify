import {createBrowserRouter, RouterProvider} from 'react-router'
import Login from '../features/auth/ui/Login'
import PublicRoutes from '../protectedRoutes/PublicRoutes'
import AuthLayout from '../layout/AuthLayout'
import Register from '../features/auth/ui/Register'
import { useEffect } from 'react'
import { MeThunk } from '../features/auth/state/authThunkSlice'
import { useDispatch } from 'react-redux'
import ProtectedRoutes from '../protectedRoutes/ProtectedRoutes'
import DashboardLayout from '../layout/DashboardLayout'
import Home from '../features/home/ui/Home'


const MainRoutes = () => {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(MeThunk());
    },[])

    const Router = createBrowserRouter([
      {
        path: "/",
        element: <PublicRoutes />,
        children: [
          {
            path: "",
            element: <AuthLayout />,
            children: [
              {
                path: "",
                element: <Login />,
              },
              {
                path: "register",
                element: <Register />,
              },
            ],
          },
        ],
      },
      {
        path: "/dashboard",
        element: <ProtectedRoutes />,
        children: [
          {
            path: "",
            element: <DashboardLayout />,
            children: [
              {
                path: "",
                element: <Home/>
              },
            ],
          },
        ],
      },
    ]);

  return <RouterProvider router={Router}/>
}

export default MainRoutes;