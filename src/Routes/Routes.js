import { createBrowserRouter } from "react-router-dom";
import Attendence from "../Pages/Attendence/Attendence";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Signup />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/login',
        element: <Login />, 
    },
    {
        path: '/attendence',
        element: <Attendence />,
    },
    {
        path: '*',
        element: <ErrorPage />,
    }
])