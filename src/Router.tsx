import { Route, Router, createBrowserRouter } from "react-router";
import navBar from "./components/navBar";
import { Home } from "@mui/icons-material";
import { Outlet } from "react-router";
import NavBar from "./components/navBar";
import About from "./components/about";
import HomePage from "./components/home";


const myRouter=createBrowserRouter([{

    path: '/',
    element: (<><NavBar/><Outlet /></>),
    children: [
        
        {path: 'homePage',element: <HomePage/>},
    { path: 'about', element: <About /> }
    ]
}])


export default myRouter;