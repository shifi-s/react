import { useContext, useRef } from "react"
import { context } from "./home"
import { Box, Button, Modal, TextField } from "@mui/material"

const Update = ({ toUpdate }: { toUpdate: Function }) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const userContext = useContext(context)


    const handleSubmit = () => {
        userContext?.userDispatch({ type: 'update', data: { name: nameRef.current?.value, password: passwordRef.current?.value, address: addressRef.current?.value, phone: phoneRef.current?.value } })
        toUpdate()
    }
    return (<>

        <Modal open  >

            <Box sx={{
                background: 'white', position: 'absolute',
                top: '50%',
                left: '50%',
                border: '3px solid black',
                width: '250px',
                padding: '30px',
                transform: 'translate(-50%, -50%)'
            }}>  <div style={{fontSize:30,fontWeight:'bold'}}> welcome, {userContext?.user.name}!</div>
                <TextField placeholder="name" inputRef={nameRef} ></TextField>
                <TextField placeholder="password" inputRef={passwordRef} ></TextField>
                <TextField placeholder="address" inputRef={addressRef} ></TextField>
                <TextField placeholder="phone" inputRef={phoneRef} ></TextField>
                <Button variant="contained" onClick={() => { handleSubmit() }} sx={{margin:'10px',color:'white', bgcolor:'black'}}>save changes</Button>
            </Box>
        </Modal>

    </>)


}
export default Update;