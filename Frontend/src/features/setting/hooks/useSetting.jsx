import { logoutApi } from "../apis/setting.api"
import {useDispatch, useSelector} from "react-redux"
import { useNavigate } from "react-router"
import { logout } from "../../auth/state/authSlice"
const useSetting = () => {

    const navigate = useNavigate()

    const {user,isLoading} = useSelector(store => store.auth)
    const dispatch = useDispatch()

    function LogoutAPi(){
        logoutApi()
        navigate("/")
        dispatch(logout());
    }

  return {LogoutAPi,user,isLoading}
}

export default useSetting