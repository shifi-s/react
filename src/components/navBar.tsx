
import { NavLink } from "react-router";

const NavBar = () => {
  return (<>
    <nav>
      <div style={{ position: "absolute", top: "10px", right: "10px", fontSize: "20px" }}>
        <NavLink to="/home" style={({ isActive }) => ({
          color: isActive ? 'orange' : 'black', fontWeight: "bold", margin: " 0 10px"
        })}>Home</NavLink> |
        <NavLink to="/recipes" style={({ isActive }) => ({ fontWeight: "bold", margin: " 0 10px", color: isActive ? 'orange' : 'black' })}>Our Recipes</NavLink>
      </div>
    </nav>
  </>)

}
export default NavBar;