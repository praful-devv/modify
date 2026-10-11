import useSetting from "../hooks/useSetting"


const Setting = () => {

    const { LogoutAPi, user, isLoading } = useSetting();

   

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information.
        </p>
      </div>

      <section className=" rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">Your account details.</p>

        <div className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Username
            </label>

            <input
              type="text"
              value={user?.user?.username}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={user?.user?.email}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700 outline-none"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Account</h2>

        <p className="mt-1 text-sm text-gray-500">
          Information associated with your Moodify account.
        </p>

        <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-4">
          <div>
            <p className="font-medium text-gray-800">Account Username</p>
            <p className="mt-1 text-sm text-gray-500">
              @{user?.user?.username}
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Active
          </span>
        </div>
        <button 
        className="bg-red-500 px-4 py-1 rounded text-white"
        onClick={() => LogoutAPi()}>logout</button>
      </section>
    </div>
  );
}

export default Setting