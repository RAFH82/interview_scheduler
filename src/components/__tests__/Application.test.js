import React from 'react';

import {
	render,
	cleanup,
	waitForElement,
	fireEvent,
	getByText,
	prettyDOM,
	getAllByTestId,
	getByLabelText,
	getByPlaceholderText,
	getByDisplayValue,
	getByAltText,
	getByTitle,
	getByRole,
	queryByText,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
	it('defaults to Monday and changes the schedule when a new day is selected', async () => {
		const { getByText, queryByText } = render(<Application />);

		await waitForElement(() => getByText('Monday'));

		fireEvent.click(getByText('Tuesday'));

		expect(queryByText('Leopold Silvers')).toBeInTheDocument();
	});

	it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
		const { container, debug } = render(<Application />);

		await waitForElement(() => getByText(container, /archie cohen/i));

		const appointment = getAllByTestId(container, 'appointment')[0];

		fireEvent.click(getByAltText(appointment, 'Add'));

		const input = getByPlaceholderText(appointment, /enter student name/i);

		fireEvent.change(input, {
			target: { value: /lydia miller-jones/i },
		});

		fireEvent.click(getByAltText(appointment, /sylvia palmer/i));

		fireEvent.click(getByText(appointment, 'Save'));

		expect(getByText(appointment, 'SAVING')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, /lydia miller-jones/i));

		const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));

		expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
	});

	it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
		const { container } = render(<Application />);

		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointment = getAllByTestId(container, 'appointment').find((appointment) =>
			queryByText(appointment, 'Archie Cohen')
		);

		fireEvent.click(getByAltText(appointment, 'Delete'));

		expect(getByText(appointment, 'Are you sure you would like to delete?')).toBeInTheDocument();

		fireEvent.click(getByText(appointment, 'Confirm'));

		expect(getByText(appointment, 'DELETING')).toBeInTheDocument();

		await waitForElement(() => getByAltText(appointment, 'Add'));

		const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));

		expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
	});

	it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
		// 1. Render the Application.
		const { container } = render(<Application />);

		// 2. Wait until the text "Archie Cohen" is displayed.
		await waitForElement(() => getByText(container, 'Archie Cohen'));

		const appointment = getAllByTestId(container, 'appointment').find((appointment) =>
			queryByText(appointment, 'Archie Cohen')
		);

		fireEvent.click(getByAltText(appointment, 'Edit'));

		const input = getByPlaceholderText(appointment, /enter student name/i);

		fireEvent.change(input, {
			target: { value: 'Lydia Miller-Jones' },
		});

		fireEvent.click(getByText(appointment, 'Save'));

		expect(getByText(appointment, 'SAVING')).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, /lydia miller-jones/i));

		const day = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));

		expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
	});
});
