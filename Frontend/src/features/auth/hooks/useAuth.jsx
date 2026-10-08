import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { LoginThunk, RegisterThunk } from "../state/authThunkSlice";

const useAuth = () => {

    const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  function LoginForm(data){
    dispatch(LoginThunk(data))
  }
  function RegisterForm(data){
    dispatch(RegisterThunk(data));
  }

  return { register, handleSubmit, errors, LoginForm, RegisterForm }
}

export default useAuth;
