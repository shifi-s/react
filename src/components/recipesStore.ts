import { makeAutoObservable } from "mobx";
import { Recipe } from "./types";
import axios from "axios";

class RecipesStore {
  list: Recipe[] = []
  constructor() {
    makeAutoObservable(this)
    this.getAllRecipes()
  }
  getAllRecipes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/recipes/')
      this.list=res.data

    }
    catch (e) {
      alert('something wrong...')
    }
  }

  getRecipeById=(id:number)=>{
  return this.list.find(r=>r.id==id)
  }
  
  addRecipe = async (recipe: Partial<Recipe>,id:number) => {
    try {
      const res=await axios.post("http://localhost:3000/api/recipes", { 
        title:recipe.title,
        description:recipe.description,
        ingredients:recipe.ingredients,
        instructions:recipe.instructions
       }, { headers: { 'user-id':id} })
       this.list.push(res.data.recipe)
    }
    catch (e) {
        alert('something wrong...')
    }
    
  }
  

}
export default new RecipesStore()