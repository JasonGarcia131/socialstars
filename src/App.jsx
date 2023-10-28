import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./features/Landing";
import Login, { loginLoader, loginAction } from "./features/Login";
import Dashboard from "./features/Dashboard";
import RequireAuth from './components/RequireAuth'
import Unauthorized from './components/Unauthorized'
import PersistLogin from "./components/PersistLogin";
import Profile, {profileLoader} from "./features/Profile";
import useAuth from "./hooks/useAuth";

const ROLES = {
  User: 2001,
  Admin: 1994
}

import AuthContext from "./context/AuthProvider";
import { useContext } from "react";

const App = () => {
 const {setAuth, auth} = useAuth();

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>

      {/* Public Routes */}
      <Route index element={<Landing />} />
      <Route path="unauthorized" element={<Unauthorized/>}/>
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction(setAuth)}
      />
      {/* <Route
        path="register"
        element={<Register />}
      /> */}

      {/* Private Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path="profile/:userId"
              element={<Profile />}
              loader={profileLoader}
            />
        </Route>
      </Route>
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App;
