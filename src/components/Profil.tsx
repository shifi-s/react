import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material"
import { useContext, useState } from "react"
import { context } from "./AppLayOut"

import React from "react"
import { Settings } from "@mui/icons-material"

const UserProfil = ({ setUpdate }: { setUpdate: Function }) => {
  const userContext = useContext(context)
  const[anchorEl,setAnchorEl]=useState<null|HTMLElement>(null)
const handleClick=(event:React.MouseEvent<HTMLElement>)=>{
  setAnchorEl(event.currentTarget)
}
const handleClose=()=>{
  setAnchorEl(null)
}
const update=()=>{
  handleClose()
setUpdate(true)

}
  return (<>
  <div style={{ position:"absolute",top:"10px",left:"10px"}}>
  <Tooltip title="Account settings">
  <IconButton onClick={handleClick}
     size="small" ><Avatar sx={{ bgcolor: 'orange', border: '8px solid orange'}}>{userContext?.user.name[0]}</Avatar></IconButton></Tooltip >
    <div style={{fontSize:15,fontWeight:'bold'}}>   hi, {userContext?.user.name}!
    </div>
    </div>
  <Menu
  anchorEl={anchorEl}
  id="account-menu"
  open={Boolean(anchorEl)}
  onClose={handleClose}
  slotProps={{
    paper: {
      elevation: 0,
      sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&::before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      },
    },
  }}

  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
>
  <MenuItem onClick={update}>
  <ListItemIcon>
 <Settings fontSize="small" />
</ListItemIcon>
       set details
</MenuItem>
</Menu>
  </>)
}
export default UserProfil