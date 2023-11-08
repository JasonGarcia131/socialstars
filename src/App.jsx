import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./features/Landing";
import Login, { loginLoader } from "./features/Login";
import Register from "./features/Register";
import Dashboard from "./features/Dashboard";
import RequireAuth from './components/RequireAuth'
import Unauthorized from './components/Unauthorized'
import PersistLogin from "./components/PersistLogin";
import Profile, { profileLoader } from "./features/Profile";
import useAuth from "./hooks/useAuth";
import PageNotFound from "./components/PageNotFound";
import PublicProfile from "./features/PublicProfile";
import News from "./components/News";
import Feedback from "./components/Feedback";
import About from "./components/About";

const ROLES = {
  User: 2001,
  Admin: 1994
}
const App = () => {
  const { setAuth} = useAuth();
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>

      {/* Public Routes */}
      <Route index element={<Landing />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="about" element={<About/>}/>
      <Route path="login" element={<Login />} loader={loginLoader}/>
      <Route path="register" element={<Register />}/>
      <Route exact path={`ispublic/profile/:userId`}
        element={<PublicProfile />}
        loader={profileLoader}
      />

      {/* Private Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route exact path={`profile/:userId`}
            element={<Profile />}
            loader={profileLoader}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/news" element={<News />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<PageNotFound />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App;
