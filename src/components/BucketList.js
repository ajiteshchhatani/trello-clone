import * as React from 'react';
import Paper from '@mui/material/Paper';
import { TrelloCloneContext } from '../App';
import BucketContent from './BucketContent';

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
                                <h3>{bucket.bucketName}</h3>
                                <h4>{bucket.bucketDescription}</h4>
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