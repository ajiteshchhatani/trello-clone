import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TrelloCloneContext } from '../App';

function TaskCards({tasks}) {
    const { state } = React.useContext(TrelloCloneContext);
    const getUserForTask = (assignedTo) => {
        const userForTask = state.user.find((u) => u.id === assignedTo)
        return userForTask.userName
    }

    const handleTaskCardDrag = event => {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.setData("text/plain", event.target.id)
    }
    return (
        tasks.map(task => (
            <Card key={task.id} id={task.id} className="task-card" variant='outlined' draggable="true" onDragStart={handleTaskCardDrag}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant='subtitle1'>{task.taskName}</Typography>
                        <Typography variant='body1'>{task.taskDescription}</Typography>
                        <Typography variant='body1'>AssignedTo: {getUserForTask(task.assignedTo)}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        ) 
    )
    )
}
export default TaskCards