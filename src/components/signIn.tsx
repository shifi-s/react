import { useContext, useRef, useState } from "react"

import axios from "axios"
import { Modal, Box, TextField, Button, Alert, Snackbar, AlertTitle, Stack } from "@mui/material"
import { MyContext } from "./AppLayOut"

const Signin = ({ IsConnected }: { IsConnected: Function }) => {
  const [error, setError] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const [isSignIn, setSignIn] = useState(false)
  const url = 'http://localhost:3000/api/user'
  const userContext = useContext(MyContext)
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
  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post(url + '/register', {
        name: nameRef.current?.value,
        password: passwordRef.current?.value,
        email: emailRef.current?.value,
        address: addressRef.current?.value,
        phone: phoneRef.current?.value

      })
      userContext?.userDispatch({ type: 'create', data: { id: res.data.userId, name: nameRef.current?.value, email: emailRef.current?.value, password: passwordRef.current?.value, address: addressRef.current?.value, phone: phoneRef.current?.value } })
      IsConnected()
    }
    catch (e: any) {
      if (e.status === 400)
        setError(true)
    }

  }
  return (<>
    {!isSignIn && <Button color="primary" variant="contained" style={{ backgroundColor: 'black', width: '90px', height: '40px' }} onClick={() => setSignIn(true)}>sign in</Button>}
    {isSignIn && <Modal open={isSignIn}><Box sx={style} >
      <form onSubmit={handleSubmitSignIn}>
        <Stack spacing={2}>
          <TextField inputRef={nameRef} label={"name"} required  />
          <TextField type="password" required inputRef={passwordRef} label={"password"} />
          <TextField type="email" required inputRef={emailRef} label={"email"}  />
          <TextField inputRef={addressRef} label={"address"}  />
          <TextField inputRef={phoneRef} label={"phone"}  />
          <Button type="submit" variant="contained" sx={{ margin: '10px', color: 'white', bgcolor: 'black' }}>sign in</Button>
        </Stack>
      </form>
    </Box>
    </Modal>
    }
    <Snackbar open={error}
      onClose={() => setError(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} >
      <Alert
        onClose={() => setError(false)}
        severity="error"
        sx={{ width: "100%" }}>
        <AlertTitle >error</AlertTitle>
        can not sign in : user is already exist
      </Alert>
    </Snackbar>
  </>)
}
export default Signin