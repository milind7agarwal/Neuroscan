import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    { 
    path: "/login", 
    element: <h1>login</h1> 
    },
    {
    path: "/register",
    element: <h1>register</h1>
    }
]);
