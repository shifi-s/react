import { useContext, useRef } from "react"
import { context } from "./home"
import { Box, Button, Modal, TextField } from "@mui/material"
import axios from "axios"

const Update = ({ toUpdate }: { toUpdate: Function }) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const userContext = useContext(context)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()        
        const res = await axios.put("http://localhost:3000/api/user/", { name: nameRef.current?.value || userContext?.user.name, password: passwordRef.current?.value , email:emailRef.current?.value,address: addressRef.current?.value , phone: phoneRef.current?.value  }, { headers: { 'user-id': userContext?.user.id } })

        if (res.status != 404 && res.status != 403) {
            userContext?.userDispatch({ type: 'update', data: { id: userContext.user.id, name: nameRef.current?.value} })
            toUpdate()
        }
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
            }}>  <div style={{ fontSize: 30, fontWeight: 'bold' }}> welcome, {userContext?.user.name}!</div>
                <form onSubmit={handleSubmit}> 
                    <TextField placeholder="name" inputRef={nameRef} ></TextField>
                    <TextField placeholder="password" inputRef={passwordRef} ></TextField>
                    <TextField placeholder="email" inputRef={emailRef} ></TextField>
                    <TextField placeholder="address" inputRef={addressRef} ></TextField>
                    <TextField placeholder="phone" inputRef={phoneRef} ></TextField>
                    <Button variant="contained" type="submit" sx={{ margin: '10px', color: 'white', bgcolor: 'black' }}>save changes</Button>
                </form>
            </Box>
        </Modal>

    </>)


}
export default Update;