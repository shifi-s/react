import { Link } from "react-router";
import HomePage from "./home";
import { NavLink } from "react-router";
import { fontGrid } from "@mui/material/styles/cssUtils";

const navBar=()=>
{
    return (<>
   <nav> 
   <div style={{ position: "absolute", top: "10px", right: "10px" ,fontSize:"20px"}}>
  <Link to="/about" style={{ fontWeight: "bold" ,margin:" 0 10px", color:"black"}}>About</Link> | 
  <Link to="/homePage" style={{ fontWeight: "bold",margin:" 0 10px",color:"black" }}>Home</Link>
</div>
    { <NavLink to='/rer'/> }
   </nav>
    </>)

}
export default navBar;