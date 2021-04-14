import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent("Contact Form")
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const fnField = screen.getByLabelText(/First Name*/i);
    userEvent.type(fnField, "som");

    const errMessage = await screen.findAllByTestId('error');
    expect(errMessage).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const sButton = screen.getByRole('button');
    userEvent.click(sButton);
    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId('error');
        expect(errorMessages).toHaveLength(3);
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const fnField = screen.getByLabelText(/First Name*/i);
    const lnField = screen.getByLabelText(/Last Name*/i);
    userEvent.type(fnField, 'tommy');
    userEvent.type(lnField, 'capello');
    const sButton = screen.getByRole('button');
    userEvent.click(sButton);

    const errMssg = await screen.findAllByTestId('error')
    expect(errMssg).toHaveLength(1);

})

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByLabelText(/email*/i)
    userEvent.type(email, 'tc@yahoo')
    const errorMssge = await screen.findByText(/'email must be a valid email address'/i)
    expect(errorMssge).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const sButton = screen.getByRole('button');
    userEvent.click(sButton);
    const errorMssge = await screen.findByText(/'lastName is a required field'/i)
    expect(errorMssge).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const fnField = screen.getByLabelText(/First Name*/i);
    const lnField = screen.getByLabelText(/Last Name*/i);
    const email = screen.getByLabelText(/email*/i)

    userEvent.type(fnField, 'tommy');
    userEvent.type(lnField, 'capello');
    userEvent.type(email, 'tc@yahoo.com')

    const sButton = screen.getByRole('button');
    userEvent.click(sButton);

    await waitFor(() => {
        const fnField = screen.queryByText(/First Name*/i);
        const lnField = screen.queryByText(/Last Name*/i);
        const email = screen.queryByText(/email*/i)

        const mssDisplay = screen.queryByTestId('messageDisplay')

        expect(fnField).toBeInTheDocument();
        expect(lnField).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(mssDisplay).not.toBeInTheDocument();
    })

});

test('renders all fields text when all fields are submitted.', async () => {

    render(<ContactForm />);
    const fnField = screen.getByLabelText(/First Name*/i);
    const lnField = screen.getByLabelText(/Last Name*/i);
    const email = screen.getByLabelText(/email*/i)
    const mssgField = screen.getByLabelText(/message/i)

    userEvent.type(fnField, 'tommy');
    userEvent.type(lnField, 'capello');
    userEvent.type(email, 'tc@yahoo.com')
    userEvent.type(mssgField, 'message' )

    const sButton = screen.getByRole('button');
    userEvent.click(sButton);

    await waitFor(() => {
        const fnField = screen.queryByText(/First Name*/i);
        const lnField = screen.queryByText(/Last Name*/i);
        const email = screen.queryByText(/email*/i)
        const mssDisplay = screen.queryByTestId('messageDisplay')

        expect(fnField).toBeInTheDocument();
        expect(lnField).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(mssDisplay).not.toBeInTheDocument();
    })

});