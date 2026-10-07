import React from 'react'
import { Outlet } from 'react-router'

const PublicRoutes = () => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default PublicRoutes