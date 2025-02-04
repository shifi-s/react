import { Modal, Box, TextField, Button, Snackbar, Alert, IconButton, AlertTitle, Stack, Tooltip } from "@mui/material"
import { useContext, useState } from "react"
import { MyContext } from "./AppLayOut"
import { observer } from "mobx-react-lite"
import { Add, Clear, PlusOne,  } from "@mui/icons-material"
import recipesStore from "./recipesStore"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Recipe } from "./types"

const AddRecipe = observer(() => {
    const userContext = useContext(MyContext)
    const [isConnected, setIsConnected] = useState(false)
    const checkConnection = () => {
        if (userContext?.user.id != 0)
            setIsConnected(true)
        setClicked(true)

    }
    const schema = yup.object().shape({
        title: yup.string().required('recipie name is required'),
        description: yup.string().required("description is required").min(10, "description must be at list 10 characters"),
        ingredients: yup.array().of(yup.string().required()).min(1, "at least one ingredient is required"),
        instructions: yup.string().required("instructions is required"),
    })
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm(
        {
            resolver: yupResolver(schema),
            defaultValues: { ingredients: [""] }
        }
    )
    const { fields, append, remove } = useFieldArray({ control, name: "ingredients" })

    const [clicked, setClicked] = useState(false)

    const onSubmit: SubmitHandler<Partial<Recipe>> = (data) => {

        setClicked(false)
        recipesStore.addRecipe(data, userContext?.user.id || 0)
        reset({
            ingredients: []
        })
    }
    return (<>
        {!clicked && <Button onClick={() => checkConnection()} sx={{ color: "black", position: "absolute", top: 10 }}><Add fontSize="small" />add recipe</Button>}
        {isConnected ? <Modal open={clicked}  >
            <Box sx={{
                background: 'white', position: 'absolute',
                top: '50%',
                left: '50%',
                border: '3px solid black',
                width: '400px',
                padding: '30px',
                transform: 'translate(-50%, -50%)'
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <TextField label="title" {...register("title")} error={!!errors.title} helperText={errors.title?.message}  fullWidth />
                        <TextField label="description" {...register("description")} error={!!errors.description} helperText={errors.description?.message}  fullWidth multiline rows={3} />
                        
                        <Box  sx={{ display: "flex", alignItems: 'center' }}>
                        <TextField label={`ingredient ${1}`} error={!!errors.ingredients} helperText={errors.ingredients?.message} {...register(`ingredients.${0}`)} fullWidth />
                        <Tooltip title={'remove'} ><IconButton onClick={() => remove(0)} color="error"><Clear /></IconButton></Tooltip>
                        </Box>
                        {fields.slice(1).map((field, index) => (
                            <Box key={field.id} sx={{ display: "flex", alignItems: 'center' }}>
                                <TextField label={`ingredient ${index + 2}`} error={!!errors.ingredients} helperText={errors.ingredients?.message} {...register(`ingredients.${index+1}`)} fullWidth />
                                <Tooltip title={'remove'} ><IconButton onClick={() => remove(index)} color="error"><Clear /></IconButton></Tooltip>
                            </Box>
                        ))}
                        <Button onClick={() => append("")} sx={{ color: "black" }}><PlusOne/></Button>
                      
                        <TextField label="instructions" error={!!errors.instructions} helperText={errors.instructions?.message} {...register("instructions")}  fullWidth multiline rows={5} />
                        <Button variant="contained" type="submit" sx={{ margin: '10px', color: 'white', bgcolor: 'black' }}>add</Button>
                    </Stack>
                </form>
            </Box>
        </Modal> :
            <Snackbar open={clicked}
                onClose={() => setClicked(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                <Alert
                    onClose={() => setClicked(false)}
                    severity="info"
                    sx={{ width: "100%" }}>
                    <AlertTitle>you are not a register user</AlertTitle>
                    you have to be a Registered user in order to add a recipe!
                </Alert>
            </Snackbar>

        }
    </>)
})
export default AddRecipe