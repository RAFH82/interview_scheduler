import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
	const [state, setState] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {},
	});

	useEffect(() => {
		const first = '/api/days';
		const second = '/api/appointments';
		const third = '/api/interviewers';
		Promise.all([axios.get(first), axios.get(second), axios.get(third)]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	function findSpotsRemaining(state, id, num) {
		const day = state.days.find((day) => day.appointments.includes(id));
		const newDay = { ...day, spots: day.spots + num };
		const newDaysArr = state.days.map((day) => {
			if (day.id === newDay.id) {
				return newDay;
			} else {
				return day;
			}
		});
		return newDaysArr;
	}

	function bookInterview(id, interview) {
		const days = findSpotsRemaining(state, id, state.appointments[id].interview ? 0 : -1);

		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
			setState({ ...state, days, appointments });
		});
	}

	function cancelInterview(id) {
		const days = findSpotsRemaining(state, id, 1);

		const appointment = {
			...state.appointments[id],
			interview: null,
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios.delete(`/api/appointments/${id}`).then((res) => {
			setState({ ...state, days, appointments });
		});
	}

	const setDay = (day) => setState({ ...state, day });

	return { state, setDay, bookInterview, cancelInterview, findSpotsRemaining };
}
