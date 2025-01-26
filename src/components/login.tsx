import { Box, Button, Modal, TextField } from "@mui/material";
import {  useContext, useRef, useState } from "react";
import { context } from "./home";
import axios from "axios";


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
const Login = ({ IsConnected}: { IsConnected: Function }) => {
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const [isLogIn, setIsLogIn] = useState(false)
    const url = 'http://localhost:3000/api/user'
    const userContext = useContext(context)
    const handleSubmitLogin = async(e:React.FormEvent)=>{
      console.log(userContext?.user.name)
          e.preventDefault()

          
          try{
            const res=await axios.post(url + '/login',{ 
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value
                })
                if(res.status===401)
                alert("user is not found");
                else
               { 
               
                userContext?.userDispatch({ type: 'create', data:{id:res.data.userId,name:res.data.userName } })
                IsConnected()
                
               }
                
          } 
          catch(e)
          {
               console.log(e);
               
          }

    }
    
    return (<>
        {!isLogIn &&<Button color="primary" variant="contained" style={{backgroundColor:'black',width:'100px',height:'50px'}} onClick={() => setIsLogIn(true)}>login</Button>} 
           {isLogIn&& <Modal open={isLogIn}><Box sx={style} >
            <form onSubmit={handleSubmitLogin}>
                <TextField type="email" inputRef={emailRef} placeholder="email"  />
                <TextField type="password" inputRef={passwordRef} placeholder="password" />
        <Button type="submit">login</Button>
            </form >
            </Box>
            </Modal>}
            
    </>)
    }

export default Login;