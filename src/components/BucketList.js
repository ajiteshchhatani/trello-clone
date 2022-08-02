import * as React from 'react';
import Paper from '@mui/material/Paper';
import { TrelloCloneContext } from '../App';

function BucketList() {

    const [buckets, setBuckets] = React.useState([]);
    const { state } = React.useContext(TrelloCloneContext);

    console.log("state", state);

    React.useEffect(() => {
        setBuckets(state.bucket)
    }, [state])

    return (
        (buckets ?
            (
                <div className='bucket-list-container'>
                    {
                        buckets.map((bucket) => (
                            <Paper key={bucket.id} className="bucket">
                                <p>{bucket.bucketName}</p>
                                <p>{bucket.bucketDescription}</p>
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