import * as React from 'react';
import Paper from '@mui/material/Paper';
import { TrelloCloneContext } from '../App';
import BucketContent from './BucketContent';
import Typography from '@mui/material/Typography';

function BucketList() {

    const [buckets, setBuckets] = React.useState([]);
    const { state, dispatch } = React.useContext(TrelloCloneContext);

    React.useEffect(() => {
        setBuckets(state.bucket)
    }, [state])

    const handleOnDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }

    const handleTaskCardDrop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        fetch(`/fakeApi/task/${data}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskBucket: event.target.id
            })
        }).then(res => res.json()).then(data => dispatch({type: 'UPDATE_TASK_BUCKET', payload: data}))
    }

    /* const BucketsContext = React.createContext(null);
    const value = {
        handleOnDragOver,
        handleTaskCardDrop
    } */

    return (
        (buckets ?
            (
                <div className='bucket-list-container'>
                    {
                        buckets.map((bucket) => (
                            <Paper key={bucket.id} id={bucket.id} elevation={8} className="bucket" onDrop={handleTaskCardDrop} onDragOver={handleOnDragOver}>
                                <Typography variant='h5'>{bucket.bucketName}</Typography>
                                <Typography variant='h6'>{bucket.bucketDescription}</Typography>
                                <BucketContent bucketId={bucket.id} />
                            </Paper>
                        ))
                    }
                </div>
            ) : (
                <div><p>No buckets yet</p></div>
            )
        )
    )
}

export default BucketList