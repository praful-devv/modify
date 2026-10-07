import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { RegisterThunk } from "../state/authThunkSlice";

const useAuth = () => {

    const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  function LoginForm(data){
    console.log(data)
  }
  function RegisterForm(data){
    dispatch(RegisterThunk(data));
  }

  return { register, handleSubmit, errors, LoginForm, RegisterForm }
}

export default useAuth;
