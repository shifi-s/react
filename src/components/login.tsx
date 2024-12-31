import { Box, Button, Modal, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { context } from "./home";

const style = {
    bgcolor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width:'200px',
    transform: 'translate(-50%, -50%)',
    border: '3px solid black',
    padding:'30px'
}
const Login = ({ IsConnected }: { IsConnected: Function }) => {

    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [isLogIn, setIsLogIn] = useState(false)

    const userContext = useContext(context)
    const handleSubmit = () => {
        if (nameRef.current?.value == userContext?.user.name && passwordRef.current?.value == userContext?.user.password) {
            userContext?.userDispatch({ type: 'create', data: { name: nameRef.current?.value || '', password: passwordRef.current?.value || '' } })
            IsConnected()
        }
        else alert("username or password are wrong")
    }
    return (<>
        {!isLogIn ?
            <Button color="primary" variant="contained" style={{backgroundColor:'black',width:'100px',height:'50px'}} onClick={() => setIsLogIn(true)}>login</Button> :
            <Modal open={isLogIn}><Box sx={style} >
                <TextField inputRef={nameRef} placeholder="name"  />
                <TextField type="password" inputRef={passwordRef} placeholder="password" />
                <Button variant="contained" sx={{ bgcolor: 'black',color:'white',margin:'10px' }} onClick={() => handleSubmit()}>login</Button> </Box>
            </Modal>}

    </>
    )
}
export default Login;