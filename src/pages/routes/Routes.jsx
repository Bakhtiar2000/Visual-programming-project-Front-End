import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import ErrorPage from "../../shared/ErrorPage";
import Home from "../home/Home";
import AdminHome from "../adminHome/AdminHome";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            path: "/",
            element: <Home></Home>
        }
      ]
    },
    {
      path: "/admin",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            path: "/admin",
            element: <AdminHome></AdminHome>
        }
      ]
    },
  ]);

export default router;