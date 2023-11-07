import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
const Layout = () => {
    return (
        <main>
            <AuthProvider>
                <Outlet />
            </AuthProvider>

        </main>
    )
}

export default Layout;
