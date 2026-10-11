import { api } from "../../../config/axios"

export const logoutApi = async()=>{
   try {
     const response = api.get("/auth/logout");
     return response.data;
   } catch (error) {
     return error
   }
}