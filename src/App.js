import * as React from 'react';
import './App.css';
import { reducer, initialState } from './store/reducers';
import Content from './components/Content';
import Sidebar from './components/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  }
})

export const TrelloCloneContext = React.createContext(initialState)

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const value = { state, dispatch }

  React.useEffect(() => {
    fetch('/fakeApi/users').then(res => res.json()).then(response => {dispatch({type: 'FETCH_USERS', payload: response})})
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <TrelloCloneContext.Provider value={value}>
          <div className="App">
            <Sidebar />
            <Content />
          </div>
        </TrelloCloneContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
