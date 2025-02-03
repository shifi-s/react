import { createContext, useReducer } from "react";
import { Context, User, userReducer } from "./types";
import Header from "./header";
import NavBar from "./navBar";
import { Outlet } from "react-router";
export const context = createContext<Context | null>(null)

const AppLayOut=()=>{

const initialUser: User = {
        id: 0,
        name: ""
     }
 const [user, userDispatch] = useReducer(userReducer, initialUser)
 return(<>
    <context.Provider value={{ user, userDispatch }}>
                <Header/>
                <NavBar/>
                <Outlet/>
     </context.Provider>

 </>)



}
export default AppLayOut;