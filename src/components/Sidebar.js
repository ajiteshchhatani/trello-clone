import * as React from 'react';
import WorkspaceList from './WorkspaceList';
import AddItem from './AddItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';


function Sidebar() {
    const [open, setOpen] = React.useState(false);

    const handleItemDialogOpen = () => {
        setOpen(!open);
    }

    return (
        <div className='sidebar'>
            <IconButton aria-label='Add workspace' size='medium' onClick={handleItemDialogOpen}><AddIcon /></IconButton>
            <AddItem isOpen={open} handleCloseDialog={() => setOpen(false)} itemToAdd='workspace' />
            <WorkspaceList />
        </div>
    )
}

export default Sidebar