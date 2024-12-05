import React from 'react'
import Main from './Converter'
import {Box, Typography} from '@mui/material'

export default React.memo(function App() {
    return (
        <Box
            sx={{
                backgroundColor: '#282c34',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: { xs: '20px', md: '40px' },
            }}
        >
            <Box
                component="header"
                sx={{
                    minHeight: '5vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        margin: {xs: '20px', md: '50px'},
                        fontSize: {xs: '1.5rem', md: '2.5rem'},
                        textAlign: 'center',
                        color: '#ffffff',
                    }}
                    gutterBottom
                >
                    Number to Words
                </Typography>
            </Box>

            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    padding: { xs: '10px', md: '20px' },
                }}
            >
                <Main/>
            </Box>
        </Box>
    )
})
