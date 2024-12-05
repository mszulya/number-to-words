import {Box, Button, TextField, Typography} from '@mui/material'
import React, {FormEvent, useState} from 'react'
import {styled, Theme} from '@mui/material/styles'

const StyledTextField = styled(TextField)(({ theme }: { theme: Theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '600px',
    },
    maxWidth: '600px',
    '& input[type=number]': {
        MozAppearance: 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
}))

export const converter = (num: number): string => {
    const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
    const c = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion']

    if (num < 20) {
        return a[num]
    } else if (num < 100) {
        return b[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + a[num % 10] : '')
    } else if (num < 1000) {
        return a[Math.floor(num / 100)] + ' hundred' + (num % 100 !== 0 ? ' AND ' + converter(num % 100) : '')
    } else {
        let unitIndex = 0
        let k = num
        let words = ''

        while (k > 0) {
            const part = k % 1000
            if (part !== 0) {
                const partWords = converter(part)
                words = partWords + (unitIndex > 0 ? ' ' + c[unitIndex] : '') + (words ? ' ' + words : '')
            }
            k = Math.floor(k / 1000)
            unitIndex++
        }
        return words
    }
}

export default React.memo(function Converter() {
    const [text, setText] = useState<string>('')

    const handleSubmit = React.useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const input = formData.get('input')

        if (!input || parseFloat(input.toString()) < 0) {
            setText('Please enter a valid number')
            return
        }

        let [int, fr] = input.toString().split('.')

        if (fr && fr[0] === '0') {
            fr = fr[1]
        }

        const convertedText = `${Number(int) === 0 ? '' : converter(Number(int)) + (Number(int) === 1 ? ' DOLLAR' : ' DOLLARS')} ${fr ? (Number(int) === 0 ? '' : 'AND ') + converter(Number(fr)) + (Number(fr) === 1 ? ' CENT' : ' CENTS') : ''} `.toUpperCase()
        setText(convertedText)
    }, [])

    const handleReset = React.useCallback(() => {
        setText('')
    }, [])

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <Box
                sx={{
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: { xs: '10px', md: '20px' },
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '50px',
                    }}
                >
                    <StyledTextField
                        name='input'
                        className='Main-input'
                        id='outlined-basic'
                        label="Enter a number"
                        variant='outlined'
                        placeholder='123.45'
                        type='number'
                        inputProps={{min:'0', step:'0.01', 'data-testid': 'input'}}
                        autoFocus
                    />

                    <Button
                        type='submit'
                        variant="contained"
                        disableElevation
                        data-testid='convert'
                        sx={{
                            marginTop: { xs: '10px', sm: '0' },
                            width: { xs: '100%', sm: 'auto' },
                            height: '56px',
                            paddingX: '40px',
                        }}
                    >
                        Convert
                    </Button>

                    <Button
                        type='reset'
                        variant="outlined"
                        data-testid='clear'
                        sx={{
                            marginTop: { xs: '10px', sm: '0' },
                            width: { xs: '100%', sm: 'auto' },
                            height: '56px',
                            paddingX: '40px',
                        }}
                    >
                        Clear
                    </Button>
                </Box>

                {text && (
                    <Typography
                        variant="h6"
                        gutterBottom
                    >
                        {text}
                    </Typography>
                )}
            </Box>
        </form>
    )
})
