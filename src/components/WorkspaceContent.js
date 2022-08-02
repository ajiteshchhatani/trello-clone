import * as React from 'react';
import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import BucketList from './BucketList';
import AddItem from './AddItem';

function WorkspaceContent() {
    const params = useParams();
    const [open, setOpen] = React.useState(false);

    const handleItemDialogOpen = () => {
        setOpen(true)
    }
    return (
        <div className='workspace-details-container'>
            <p>Here into Workspace {params.id} after clicking on link</p>
            <Button variant='contained' className='button-create-bucket theme-button' onClick={handleItemDialogOpen}>Create Bucket</Button>
            <AddItem isOpen={open} handleCloseDialog={() => setOpen(false)} itemToAdd='bucket' id={params.id} />
            <BucketList />
        </div>
    )
}

export default WorkspaceContent