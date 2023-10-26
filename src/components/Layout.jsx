import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/AuthProvider";
const Layout = () => {
    return (
        <main className="App">
            <AuthProvider>
                <Outlet />
            </AuthProvider>

        </main>
    )
}

export default Layout;
