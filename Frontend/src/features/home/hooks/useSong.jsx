
import {useDispatch, useSelector} from "react-redux"
import { SongThunk } from "../state/songThunk";

const useSong = () => {

    const {song} = useSelector(store=>store.song)
    
    const dispatch = useDispatch();

 async function SongHook(mood){  
    dispatch(SongThunk(mood));
     }

  return { SongHook ,song };
}

export default useSong