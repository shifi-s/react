import { Grid2 as Grid } from "@mui/material";
import { createContext, useReducer, useState } from "react";
import Update from "./update";
import Login from "./login";
import { Context, User, userReducer } from "./types";
import UserProfil from "./finalPage";
export const context = createContext<Context | null>(null)
const HomePage = () => {

   const initialUser: User = {
      name: "shifi",
      password: "215750613",
      address: "",
      phone: ""
   }

   const [user, userDispatch] = useReducer(userReducer, initialUser)
   const [isLogIn, setIsLogIn] = useState(false)
   const [toUpdate, setToUpdate] = useState(false)
   const handletoupdate = () => {
      setToUpdate(!toUpdate)
   }
   const handleConected = () => {
      setIsLogIn(true)
   }

   return (<>

      <Grid container >
         <Grid>
            <context.Provider value={{ user, userDispatch }}>
               {!isLogIn && <Login IsConnected={handleConected} />}
               {isLogIn && <UserProfil setUpdate={handletoupdate} />}
               {toUpdate && <Update toUpdate={handletoupdate} />}
            </context.Provider>
         </Grid>
      </Grid>


   </>
   )


}
export default HomePage;