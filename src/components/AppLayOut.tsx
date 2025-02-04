import { createContext, useReducer } from "react";
import { Context, User, userReducer } from "./types";
import Header from "./header";
import NavBar from "./navBar";
import { Outlet } from "react-router";
export const MyContext = createContext<Context | null>(null)

const AppLayOut = () => {

    const initialUser: User = {
        id: 0,
        name: "",
        email: "",
        password: "",
        address: "",
        phone: ""
    }
    const [user, userDispatch] = useReducer(userReducer, initialUser)
    return (<>
        <MyContext value={{ user, userDispatch }}>
            <Header />
            <NavBar />
            <Outlet />
        </MyContext>

    </>)
}
export default AppLayOut;