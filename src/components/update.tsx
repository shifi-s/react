import { useContext, useRef } from "react"
import { MyContext } from "./AppLayOut"
import { Box, Button, Modal, Stack, TextField } from "@mui/material"
import axios from "axios"

const Update = ({ toUpdate }: { toUpdate: Function }) => {
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const userContext = useContext(MyContext)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.put("http://localhost:3000/api/user/", { name: nameRef.current?.value, password: passwordRef.current?.value, email: emailRef.current?.value, address: addressRef.current?.value, phone: phoneRef.current?.value }, { headers: { 'user-id': userContext?.user.id } })
            userContext?.userDispatch({ type: 'update', data: { id: userContext.user.id, name: nameRef.current?.value, email: emailRef.current?.value, password: passwordRef.current?.value, address: addressRef.current?.value, phone: phoneRef.current?.value } })
            toUpdate()
        }
        catch (e) {
            alert('something wrong...')
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
            }}>
                <form style={{ padding: 10 }} onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <div style={{ fontSize: 30, fontWeight: 'bold' }}> welcome, {userContext?.user.name}!</div>
                        <TextField label='name' placeholder={userContext?.user.name} inputRef={nameRef} ></TextField>
                        <TextField label='password' placeholder={userContext?.user.password} inputRef={passwordRef} ></TextField>
                        <TextField label='email' placeholder={userContext?.user.email} inputRef={emailRef} ></TextField>
                        <TextField label='address' placeholder={userContext?.user.address} inputRef={addressRef} ></TextField>
                        <TextField label='phone' placeholder={userContext?.user.phone} inputRef={phoneRef} ></TextField>
                        <Button variant="contained" type="submit" sx={{ margin: '10px', color: 'white', bgcolor: 'black' }}>save changes</Button>
                    </Stack>
                </form>
            </Box>
        </Modal>

    </>)


}
export default Update;