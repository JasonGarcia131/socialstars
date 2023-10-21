import { useLocation, redirect, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import jwt_decode from "jwt-decode";

export const RequireAuth = () => {
    // const { auth } = useAuth();
    // const location = useLocation();

    // const decode = auth?.accessToken
    //     ? jwt_decode(auth.accessToken)
    //     : undefined

    // const roles = decode?.UserInfo?.roles || [];

    // return (
    //     roles.find(role => allowedRoles?.includes(role))
    //         ? <Outlet />
    //         : auth?.accessToken //changed from user to accessToken to persist login after refresh
    //             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //             : <Navigate to="/login" state={{ from: location }} replace />
    // );

  
        const loggedIn = false;
          if(!loggedIn) {
            //redirect
            throw redirect("/login?message=you must log in first")
          }
}
