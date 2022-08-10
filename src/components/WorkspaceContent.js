import * as React from 'react';
import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import BucketList from './BucketList';
import AddItem from './AddItem';
import { styled } from '@mui/material/styles'

const styles = {
    root: {
        margin: '1em'
    }
}

const CustomButton = styled(Button)`
    margin: 1em
`

function WorkspaceContent() {
    const params = useParams();
    const [open, setOpen] = React.useState(false);

    const handleItemDialogOpen = () => {
        setOpen(true)
    }
    return (
        <div className='workspace-details-container'>
            <Button 
                variant='contained' 
                className='button-create-bucket theme-button' 
                onClick={handleItemDialogOpen}
                sx={{
                    m: "1rem"
                }}
                >
                    Create Bucket
            </Button>
            <AddItem isOpen={open} handleCloseDialog={() => setOpen(false)} itemToAdd='bucket' id={params.id} />
            <BucketList />
        </div>
    )
}

export default WorkspaceContent