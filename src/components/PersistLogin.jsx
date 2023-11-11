import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [])

    useEffect(() => {
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <div className="h-screen flex justify-center items-center align-center">
                        <ClipLoader
                            size={130}
                            color="white"
                        />
                    </div>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;