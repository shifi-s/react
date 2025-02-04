import { Grid2 as Grid } from "@mui/material";
import { useState } from "react";
import Update from "./update";
import Login from "./login";
import UserProfil from "./Profil";
import Signin from "./signIn";
const Header = () => {
   
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
            {!isConnected && <div style={{ position: "absolute", top: "15px", left: "10px", display: "flex", justifyContent: "space-around", width: "200px" }}><Login IsConnected={handleConected} />
               <Signin IsConnected={handleConected} /></div>}
            {isConnected && <UserProfil setUpdate={handletoupdate} />}
            {toUpdate && <Update toUpdate={handletoupdate} />}
         </Grid>
      </Grid>
   </>
   )

}
export default Header