import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";

const Layout = () => {
    return (
        <main className="w-full h-screen">
            <AuthProvider>
                <Outlet />
            </AuthProvider>

        </main>
    )
}

export default Layout;
