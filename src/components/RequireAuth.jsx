import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
   
    const { auth } = useAuth();
    const location = useLocation();

    const decode = auth?.accessToken
        ? jwt_decode(auth.accessToken)
        : undefined

    const roles = decode?.UserInfo?.roles || [];

    return (
        roles.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login?message=you must be logged in" state={{ from: location }} replace />
    );
}

export default RequireAuth;