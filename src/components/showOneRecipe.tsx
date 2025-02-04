import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import recipesStore from "./recipesStore";
import { Divider, ListItem, ListItemText, Typography, Paper, Box, TextField } from "@mui/material";

const ShowOneRecipe = observer(() => {
  const { id } = useParams();
  const recipe = recipesStore.getRecipeById(Number(id));

  return (
    <>
      {recipe && (
        <Paper
          elevation={4}
          sx={{
            width: "80vw",
            maxWidth: "1000px",
            margin: "auto",
            padding: "30px",
            backgroundColor: "#FFF8E1",
            borderRadius: "16px",
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 3 }}>
            {recipe.description}
          </Typography>
          <Divider sx={{ borderColor: "black", borderRadius: 2, width: "100%", marginBottom: 3 }} />
          <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                Ingredients:
              </Typography>
              {recipe.ingredients?.map((ingredient, index) => (
                <ListItem key={index} sx={{ padding: 0 }}>
                  <ListItemText primary={ingredient} />
                </ListItem>
              ))}
            </Box>
            <Divider orientation="vertical" flexItem sx={{ borderRadius: 2, borderColor: "black" }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                Instructions:
              </Typography>
              <Typography>{recipe.instructions}</Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
});

export default ShowOneRecipe;
