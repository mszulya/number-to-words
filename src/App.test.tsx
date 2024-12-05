import React from 'react'
import {render, screen} from '@testing-library/react'
import App from './App'

test('renders Number to Words', () => {
    render(<App />)
    const element = screen.getByText(/Number to Words/i)
    expect(element).toBeInTheDocument()
})
