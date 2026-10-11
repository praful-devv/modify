
import { NavLink, Outlet } from 'react-router'

const DashboardLayout = () => {

  

  return (
    <div className="h-dvh overflow-hidden bg-gray-50">
      <div className="grid h-full grid-cols-1 grid-rows-[auto_auto_minmax(0,1fr)] md:grid-cols-[230px_minmax(0,1fr)] md:grid-rows-[auto_1fr]">
        <aside className="border-b border-gray-200 bg-white p-4 md:row-span-2 md:border-b-0 md:border-r">
          <h1 className="text-xl font-bold">Moodify</h1>
        </aside>

    
          <nav className="flex items-center gap-3 border-b border-gray-200 bg-white p-4 md:col-start-1 md:row-start-2 md:flex-col md:items-stretch md:border-r">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-left ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/dashboard/setting"
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-left ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              Settings
            </NavLink>
          </nav>
         

        <main className="flex justify-center items-center overflow-auto  md:col-start-2 md:row-span-2 md:row-start-1">
          <section className="rounded-2xl   p-4">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout