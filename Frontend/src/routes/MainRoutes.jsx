import {createBrowserRouter, RouterProvider} from 'react-router'
import Login from '../features/auth/ui/Login'
import PublicRoutes from '../protectedRoutes/PublicRoutes'
import AuthLayout from '../layout/AuthLayout'
import Register from '../features/auth/ui/Register'

const MainRoutes = () => {

    const Router = createBrowserRouter([
        {
            path:"/",
            element:<PublicRoutes/>,
            children:[
                {
                    path:"",
                    element:<AuthLayout/>,
                    children:[
                        {
                            path:"",
                            element:<Login/>
                        },
                        {
                            path:"register",
                            element:<Register/>
                        }
                    ]
                }
            ]
        }
    ])

  return <RouterProvider router={Router}/>
}

export default MainRoutes;