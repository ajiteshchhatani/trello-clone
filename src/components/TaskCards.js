import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material';
import { TrelloCloneContext } from '../App';

function TaskCards({tasks}) {
    //console.log("props tasks", tasks)
    const { state } = React.useContext(TrelloCloneContext);
    const getUserForTask = (assignedTo) => {
        const userForTask = state.user.find((u) => u.id === assignedTo)
        return userForTask.userName
    }
    return (
        tasks.map(task => (
            <Card key={task.id} className="task-card" sx={{width: '300px', padding: '0 10px'}}>
                <CardActionArea>
                    <CardContent>
                        <h3>{task.taskName}</h3>
                        <h4>{task.taskDescription}</h4>
                        <h5>AssignedTo: {getUserForTask(task.assignedTo)}</h5>
                    </CardContent>
                </CardActionArea>
            </Card>
        ) 
    )
    )
}
export default TaskCards