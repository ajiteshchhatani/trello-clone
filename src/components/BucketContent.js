import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddItem from './AddItem';
import { TrelloCloneContext } from '../App';
import TaskCards from './TaskCards';

function BucketContent({bucketId}) {
    const [open, setOpen] = React.useState(false);
    const { state } = React.useContext(TrelloCloneContext);
    const [users, setUsers] = React.useState([])
    const [tasks, setTasks] = React.useState([])

    React.useEffect(() => {
        setUsers(state.user)
    }, [state.user])

    React.useEffect(() => {
        const tasksForThisBucket = state.tasks.filter((task) => task.taskBucket === bucketId)
        setTasks(tasksForThisBucket)
    }, [state.tasks, bucketId])

    const handleAddItemOpenDialog = () => {
        setOpen(true);
    }

    return (
        <>
            <Fab
                className='button-create-task'
                color='secondary'
                aria-label='add'
                size='small'
                sx={{
                    position: 'absolute'
                }}
                onClick={handleAddItemOpenDialog}
            >
                <AddIcon />
            </Fab>
            <AddItem 
                isOpen={open} 
                itemToAdd='task' 
                handleCloseDialog={() => setOpen(false)} 
                id={bucketId} 
                users={users} 
            />
            {
                tasks ? (
                    <TaskCards tasks={tasks} />
                ) : null
            }
        </>
    )
}

export default BucketContent