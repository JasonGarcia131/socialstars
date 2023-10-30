import axios from "../api/axios";
import useAuth from "./useAuth";
import { redirect } from "react-router-dom";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
            redirect('/')
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout;