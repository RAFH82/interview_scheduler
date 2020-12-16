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
});
