import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./pages/Root/Root";
import Dashboard from "./pages/Dashboard/Dashboard";
import TodoDetails from "./pages/TodoDetails/TodoDetails";
import Signup from "./pages/Signup/signup";
import Login from "./pages/Login/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/todo/:id", element: <TodoDetails /> },
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
