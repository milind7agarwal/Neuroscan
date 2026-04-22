import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/Login.jsx";
export const router = createBrowserRouter([
    { 
    path: "/login", 
    element: < Login />
    },
    {
    path: "/register",
    element: <h1>register</h1>
    }
]);
