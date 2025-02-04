import { createBrowserRouter } from "react-router";
import ShowRecipes from "./components/showRecipesList";
import ShowOneRecipe from "./components/showOneRecipe";
import AppLayOut from "./components/AppLayOut";
import Home from "./components/home";



const MyRouter = createBrowserRouter([{

    path: '/',
    element: <AppLayOut />,
    children: [
        { path: 'home', element: <Home /> },
        { path: 'recipes', element: <ShowRecipes />, children: [{ path: ':id', element: <ShowOneRecipe /> }] }
    ]
}])


export default MyRouter;