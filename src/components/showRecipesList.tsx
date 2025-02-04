import { observer } from "mobx-react-lite";
import recipesStore from "./recipesStore";
import { SoupKitchen } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import { Recipe } from "./types";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import AddRecipe from "./addRecipe";

const ShowRecipes = observer(() => {
  const navigate = useNavigate()
  const selectedRecipe = (recipe: Recipe) => {
    navigate(`${recipe.id}`)
  }
  return (<>

    <Paper sx={{
      position: "absolute",
      top: 50,
      right: 5,

      boxShadow: 3,
    }}>
      {recipesStore.list.map((recipe) => (
        <ListItemButton key={recipe.id} onClick={() => selectedRecipe(recipe)} >
          <ListItemIcon>
            <SoupKitchen />
          </ListItemIcon>
          <ListItemText primary={recipe.title} />
        </ListItemButton>
      ))}
    </Paper>
    <AddRecipe />
    <Outlet />
  </>)

})
export default ShowRecipes




