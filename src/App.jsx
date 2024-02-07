import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./pages/Root/Root";
import Dashboard from "./pages/Dashboard/Dashboard";
import TodoDetails from "./pages/TodoDetails/TodoDetails";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import About from "./pages/About/About";

function App() {
  const user = useSelector((state) => state.login.currentLogin)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/dashboard", element: user !== '' ? <Dashboard /> : <Home />},
        { path: "/todo/:id", element: user !== ''? <TodoDetails /> : <Home />},
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },
        {path: '/about', element: <About />}

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
