import * as React from 'react';
import { Link } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import { TrelloCloneContext } from '../App';
//import { initialState, reducer } from '../store/reducers';

function WorkspaceList() {
    const [list, setList] = React.useState([]);
    const { state } = React.useContext(TrelloCloneContext);

    React.useEffect(() => {
        //console.log(state.workspace);
        setList(state.workspace)
    }, [state])

    function getIconToDisplay(icon) {
        switch (icon) {
            case 'BusinessIcon':
                return <BusinessIcon />;
            case 'FacebookIcon':
                return < FacebookIcon />;
            case 'GitHubIcon':
                return <GitHubIcon />
            case 'GoogleIcon':
                return <GoogleIcon />
            case 'InstagramIcon':
                return <InstagramIcon />
            default:
                return <InstagramIcon />
        }
    }
    return (
        <ul className="workspace-list">
            {
                list.map(item => (
                    <li key={item.id} title={item.icon} ><Link to={`/workspace/${item.id}`}>{getIconToDisplay(item.icon)}</Link></li>
                ))
            }
        </ul>
    )
}

export default WorkspaceList