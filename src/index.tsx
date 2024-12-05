import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createTheme, ThemeProvider} from '@mui/material'
import App from './App'
import reportWebVitals from './reportWebVitals'

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#96fdff',
        },
        secondary: {
            main: '#80e4e5',
        },
        background: {
            default: '#1e1e1e',
            paper: '#282828',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        },
    },
    typography: {
        fontFamily: `'Roboto', 'Arial', sans-serif`,
        h4: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'white',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
            color: 'white',
        },
        body1: {
            fontSize: '1rem',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': {
                        color: '#96fdff',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#96fdff',
                        },
                    },
                },
            },
        },
    },
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <ThemeProvider theme={customTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
