import { Avatar, Button } from "@mui/material"
import { useContext } from "react"
import { context } from "./home"

const UserProfil = ({ setUpdate }: { setUpdate: Function }) => {
  const userContext = useContext(context)

  return (<>
  <Button onClick={() => setUpdate()} style={{ borderRadius: '50%', backgroundColor: 'orange' }}><Avatar sx={{ bgcolor: 'orange', border: '5px solid orange' }}>{userContext?.user.name[0]}</Avatar></Button>
    <div style={{fontSize:30,fontWeight:'bold'}}>   hi, {userContext?.user.name}!
    </div>
  </>)
}
export default UserProfil