import React from 'react'
import ReactDOM from 'react-dom/client'
import { Contacts } from './views/Contacts'
import { StyledEngineProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <Contacts />
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
