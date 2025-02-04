import { Alert, AlertTitle, Box, Button, Modal, Snackbar, Stack, TextField } from "@mui/material";
import { useContext, useRef, useState } from "react";

import axios from "axios";
import { MyContext } from "./AppLayOut";

const style = {
  bgcolor: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '200px',
  transform: 'translate(-50%, -50%)',
  border: '3px solid black',
  padding: '30px'
}

const Login = ({ IsConnected }: { IsConnected: Function }) => {
  const [error, setError] = useState(false)
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [isLogIn, setIsLogIn] = useState(false)
  const url = 'http://localhost:3000/api/user'
  const userContext = useContext(MyContext)
  const handleSubmitLogin = async (e: React.FormEvent) => {
    console.log(userContext?.user.name)
    e.preventDefault()
    try {
      const res = await axios.post(url + '/login', {
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      })
      userContext?.userDispatch({ type: 'create', data: { id: res.data.user.id, name: res.data.user.name, email: res.data.user.email, password: res.data.user.password, address: res.data.user.address, phone: res.data.user.phone, } })
      IsConnected()
    }
    catch (e: any) {
      if (e.status === 401)
        setError(true)
    }

  }

  return (<>
    {!isLogIn && <Button color="primary" variant="contained" style={{ backgroundColor: 'black', width: '90px', height: '40px' }} onClick={() => setIsLogIn(true)}>login</Button>}
    {isLogIn && <Modal open={isLogIn}><Box sx={style} >
      <form style={{ padding: 10 }} onSubmit={handleSubmitLogin}>
        <Stack spacing={2}>
          <TextField label={"email"} type="email" inputRef={emailRef}  fullWidth />
          <TextField label={"password"} type="password" inputRef={passwordRef} fullWidth  />
          <Button type="submit" variant="contained" sx={{ margin: '10px', color: 'white', bgcolor: 'black' }}>login</Button>
        </Stack>
      </form >
    </Box>
    </Modal>}
    <Snackbar open={error}
      onClose={() => setError(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} >
      <Alert
        onClose={() => setError(false)}
        severity="error"
        sx={{ width: "100%" }}>
        <AlertTitle >error</AlertTitle>
        user not found: email or password ar not correct
      </Alert>
    </Snackbar>
  </>)
}

export default Login;