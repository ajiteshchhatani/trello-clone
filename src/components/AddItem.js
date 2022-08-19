import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import { Alert, Button, DialogContent, Snackbar } from '@mui/material';
import { TrelloCloneContext } from '../App';


function AddItem({ isOpen, handleCloseDialog, itemToAdd, id, users }) {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [bucketDescription, setBucketDescription] = React.useState('')
    const [taskDescription, setTaskDescription] = React.useState('')
    const [taskUser, setTaskUser] = React.useState('')
    const { dispatch } = React.useContext(TrelloCloneContext)

    const handleClose = () => {
        handleCloseDialog()
    }

    const handleNameChange = event => {
        setName(event.target.value)
    }

    const handleDescriptionChange = event => {
        setBucketDescription(event.target.value)
    }

    const handleTaskDescriptionChange = event => {
        setTaskDescription(event.target.value)
    }

    const handleTaskUserChange = event => {
        setTaskUser(event.target.value)
    }

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbarOpen(false)
    }

    async function postItemDataAsync(url = '', data = '') {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then(data => { return data })
        return response;
    }

    const handleCreate = () => {
        if (itemToAdd.toLowerCase() === 'workspace') {
            postItemDataAsync('/fakeApi/workspace', { 'workspaceName': name }).then(
                (response) => {
                    handleSnackbarOpen()
                    //setTimeout(shouldFetchAfterPost(true), 2000);
                    dispatch({ type: "ADD_WORKSPACE", payload: response })
                },
                (error) => {
                    console.error(error)
                }
            )
        }
        if (itemToAdd.toLowerCase() === 'bucket') {
            postItemDataAsync('/fakeApi/bucket', {
                bucketName: name,
                bucketDescription: bucketDescription,
                workspace: id
            }).then(
                (response) => {
                    handleSnackbarOpen()
                    //setTimeout(shouldFetchAfterPost(true), 2000);
                    dispatch({ type: "ADD_BUCKET", payload: response })
                },
                (error) => {
                    console.error(error)
                }
            )
        }
        if (itemToAdd.toLowerCase() === 'task') {
            postItemDataAsync('/fakeApi/task', {
                taskName: name,
                taskDescription: taskDescription,
                //taskDate: String,
                assignedTo: taskUser,
                taskBucket: id
            }).then(
                (response) => {
                    handleSnackbarOpen()
                    //setTimeout(shouldFetchAfterPost(true), 2000);
                    dispatch({ type: "ADD_TASK", payload: response })
                },
                (error) => {
                    console.error(error)
                }
            )
        }
        handleCloseDialog()
    }
    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Create a {itemToAdd}!</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        placeholder={`${itemToAdd} name`} 
                        aria-label={`${itemToAdd} name`} 
                        onChange={handleNameChange}
                    >
                    </TextField>
                    {
                        itemToAdd.toLowerCase() === 'bucket' ?
                            <TextField
                                multiline
                                className='bucket-description'
                                placeholder='Bucket description'
                                maxRows={4}
                                aria-label='Bucket description'
                                onChange={handleDescriptionChange}
                                sx={{
                                    display: 'block'
                                }}
                            ></TextField>
                            : null
                    }
                    {
                        itemToAdd.toLowerCase() === 'task' ?
                            <>
                                <TextField 
                                    multiline 
                                    className='task-description' 
                                    placeholder='Task description' 
                                    maxRows={4} 
                                    aria-label='Task description' 
                                    onChange={handleTaskDescriptionChange}
                                    sx={{
                                        display: 'block'
                                    }} 
                                ></TextField>
                                <InputLabel id='userAssignedTo'>Assigned To:</InputLabel>
                                <Select
                                    labelId='userAssignedTo'
                                    id='userAssignedToSelect'
                                    value={taskUser}
                                    label="Assigned To"
                                    onChange={handleTaskUserChange}
                                >
                                    {
                                        users.map((user) => (
                                            <MenuItem key={user.id} value={user.id}>{user.userName}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </>
                            : null
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreate}>Create</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity='success'>{`${itemToAdd} created successfully`}</Alert>
            </Snackbar>
        </>
    )
}

export default AddItem