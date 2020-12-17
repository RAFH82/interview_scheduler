import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
	const interviewers = [
		{
			id: 1,
			name: 'Slyvia Palmer',
			avatar: 'https://i.imgur.com/LpaY82x.png',
		},
	];

	it('renders without a student name if not provided', () => {
		const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
		expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
	});

	//

	it('renders with initial student name', () => {
		const { getByTestId } = render(<Form interviewers={interviewers} name="Lydia Miller-Jones" />);
		expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
	});

	//

	it('validates that the student name is not blank', () => {
		const onSave = jest.fn();

		const { getByText } = render(<Form interviewers={interviewers} onSave={onSave} />);

		fireEvent.click(getByText('Save'));

		expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

		expect(onSave).not.toHaveBeenCalled();
	});

	//

	it('can successfully save after trying to submit an empty student name', () => {
		const onSave = jest.fn();
		const { getByText, getByPlaceholderText, queryByText } = render(
			<Form interviewers={interviewers} interviewer={1} onSave={onSave} />
		);

		fireEvent.click(getByText('Save'));

		expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
		expect(onSave).not.toHaveBeenCalled();

		const input = getByPlaceholderText('Enter Student Name');
		fireEvent.change(input, {
			target: { value: 'Lydia Miller-Jones' },
		});

		fireEvent.click(getByText('Save'));

		expect(queryByText(/student name cannot be blank/i)).toBeNull();

		expect(onSave).toHaveBeenCalledTimes(1);
		expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
	});

	//

	it('calls onCancel and resets the input field', () => {
		const onCancel = jest.fn();
		const { getByText, getByPlaceholderText, queryByText } = render(
			<Form interviewers={interviewers} name="Lydia Mill-Jones" onSave={jest.fn()} onCancel={onCancel} />
		);
		const input = getByPlaceholderText('Enter Student Name');

		fireEvent.click(getByText('Save'));

		fireEvent.change(input, {
			target: { value: 'Lydia Miller-Jones' },
		});

		fireEvent.click(getByText('Cancel'));

		expect(queryByText(/student name cannot be blank/i)).toBeNull();

		expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');

		expect(onCancel).toHaveBeenCalledTimes(1);
	});
});
