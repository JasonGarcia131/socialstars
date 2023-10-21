import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, redirect } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./features/Landing";
import Login, { action, loginLoader } from "./features/Login";
import Dashboard from "./features/Dashboard";
import { RequireAuth } from "./components/RequireAuth";
import Register from "./features/Register";

const App = () => {

  const router = createBrowserRouter(createRoutesFromElements(


    <Route path="/" element={<Layout />}>
      {/* Public Routes */}
      <Route index element={<Landing />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={action}
      />
      <Route
        path="register"
        element={<Register />}
      />

      {/* Private Routes */}
      <Route
        path='dashboard'
        element={<Dashboard />}
        loader={async () => await RequireAuth()}
      />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App;
