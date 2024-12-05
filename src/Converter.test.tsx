import React from 'react'
import {act, render, screen} from '@testing-library/react'
import { default as Converter, converter} from './Converter'

describe('converter', () => {
    test('converts numbers less than 20', () => {
        expect(converter(0)).toBe('')
        expect(converter(1)).toBe('one')
        expect(converter(19)).toBe('nineteen')
    })

    test('converts numbers between 20 and 99', () => {
        expect(converter(20)).toBe('twenty')
        expect(converter(21)).toBe('twenty-one')
        expect(converter(99)).toBe('ninety-nine')
    })

    test('converts numbers between 100 and 999', () => {
        expect(converter(100)).toBe('one hundred')
        expect(converter(101)).toBe('one hundred AND one')
        expect(converter(999)).toBe('nine hundred AND ninety-nine')
    })

    test('converts numbers 1000 and above', () => {
        expect(converter(1000)).toBe('one thousand')
        expect(converter(1001)).toBe('one thousand one')
        expect(converter(1000000)).toBe('one million')
        expect(converter(123456789)).toBe('one hundred AND twenty-three million four hundred AND fifty-six thousand seven hundred AND eighty-nine')
    })

})

describe('Converter component', () => {
    test('renders input field, convert button, and clear button', () => {
        render(<Converter />)
        expect(screen.getByLabelText(/enter a number/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /convert/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
    })

    test('displays error message for invalid input', () => {
        render(<Converter />)
        const input: HTMLInputElement = screen.getByTestId('input')
        const button =  screen.getByTestId('convert')

        act(() => {
            input.value = ''
            button.click()
        })

        expect(screen.getByText(/please enter a valid number/i)).toBeInTheDocument()
    })

    test('converts valid input to text', async () => {
        render(<Converter />)
        const input: HTMLInputElement = screen.getByTestId('input')
        const button =  screen.getByTestId('convert')

        act(() => {
            input.value = '123.45'
            button.click()
        })

        expect(screen.getByText(/one hundred AND twenty-three DOLLARS AND forty-five CENTS/i)).toBeInTheDocument()
    })

    test('clears the input and output on reset', () => {
        render(<Converter />)
        const input: HTMLInputElement = screen.getByLabelText(/enter a number/i)
        const convertButton = screen.getByTestId('convert')
        const clearButton = screen.getByTestId('clear')

        act(() => {
            input.value = '123.45'
            convertButton.click()
        })

        expect(screen.getByText(/one hundred AND twenty-three DOLLARS AND forty-five CENTS/i)).toBeInTheDocument()

        act(() => {
            clearButton.click()
        })

        expect(screen.queryByText(/one hundred AND twenty-three DOLLARS AND forty-five CENTS/i)).not.toBeInTheDocument()
        expect(input.value).toBe('')
    })
})
