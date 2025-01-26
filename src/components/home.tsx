import { Grid2 as Grid } from "@mui/material";
import { createContext, useContext, useReducer, useState } from "react";
import Update from "./update";
import Login from "./login";
import { Context, User, userReducer } from "./types";
import UserProfil from "./finalPage";
import Signin from "./signIn";
export const context = createContext<Context | null>(null)
export const id=createContext<number>(0)


const HomePage = () => {

   const initialUser: User = {
      id: 0,
      name: ""
   }

   const [user, userDispatch] = useReducer(userReducer, initialUser)
   const [isConnected, setIsConnected] = useState(false)
   const [toUpdate, setToUpdate] = useState(false)
   const handletoupdate = () => {
      setToUpdate(!toUpdate)
   }
   const handleConected = () => {
      setIsConnected(true)

   }

   return (<>

      <Grid container >
         <Grid>
            <context.Provider value={{ user, userDispatch }}>
               {!isConnected && <div style={{ display:"flex",justifyContent:"space-around", width:"250px"}}><Login IsConnected={handleConected} />
               <Signin IsConnected={handleConected}/></div>}
               {isConnected && <UserProfil setUpdate={handletoupdate} />}
               {toUpdate && <Update toUpdate={handletoupdate} />}
            </context.Provider>
         </Grid>
      </Grid>


   </>
   )


}
export default HomePage;