import * as React from 'react';
import Paper from '@mui/material/Paper';
import { TrelloCloneContext } from '../App';
import BucketContent from './BucketContent';
import Typography from '@mui/material/Typography';

function BucketList() {

    const [buckets, setBuckets] = React.useState([]);
    const { state } = React.useContext(TrelloCloneContext);

    React.useEffect(() => {
        setBuckets(state.bucket)
    }, [state])

    return (
        (buckets ?
            (
                <div className='bucket-list-container'>
                    {
                        buckets.map((bucket) => (
                            <Paper key={bucket.id} elevation={8} className="bucket">
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