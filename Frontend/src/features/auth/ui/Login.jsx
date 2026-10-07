import useAuth from '../hooks/useAuth'


const Login = () => {

    const { register, handleSubmit, errors, LoginForm } = useAuth();

  return (
    <div className="h-screen flex pt-50 items-center flex-col gap-16 bg-mist-700">
      <h1 className="text-5xl font-bold  text-gray-200">Login </h1>
      <form
        className=" flex justify-center items-center flex-col gap-2"
        onSubmit={handleSubmit(LoginForm)}
      >
        <div>
          <input
            className="border outline-0   p-3 md:p-2 md:text-lg border-white text-white rounded-xl text-xl "
            {...register("email", {
              required: "email is required",
            })}
            type="text"
            placeholder="login"
          />
          <p className="h-8 text-lg md:text-[16px] text-red-500">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <input
            className="border outline-0   p-3 md:p-2 md:text-lg border-white text-white rounded-xl text-xl"
            {...register("password", {
              required: "password is required",
            })}
            type="text"
            placeholder="password"
          />
          <p className="h-8 text-lg md:text-[16px]  text-red-500 ">
            {errors.password?.message}
          </p>
        </div>

        <button className="bg-green-500 py-2 px-4 text-xl rounded-md capitalize md:text-lg md:py-1 md:px-2">
          login
        </button>
      </form>
    </div>
  );
}

export default Login