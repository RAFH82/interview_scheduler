import React, { useState, useEffect } from "react";

import axios from "axios";

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from 'components/Appointment';
import getAppointmentsForDay from 'helpers/selectors';

export default function Application(props) {  

  const [state, setState] = useState({ 
    day: 'Monday',
    days: [],
    appointments: {}  
  });

  useEffect(() => {
    const first = 'http://localhost:8001/api/days';
    const second = 'http://localhost:8001/api/appointments';
    const third = 'http://localhost:8001/api/interviewers';
    Promise.all([
      axios.get(first),
      axios.get(second),
      axios.get(third),
      ]).then( all => {
      
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data, 
      }));
    })
  },[])

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

	const appsList = dailyAppointments.map( appointment => {
		return (
			<Appointment
			key={appointment.id }
			{... appointment}
			/>
		);
	})

	return (
		<main className="layout">
			<section className="sidebar">
				<img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
				<DayList
  				days={state.days}
  				day={state.day}
  				setDay={setDay}
				/>
				</nav>
				<img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
			</section>
			<section className="schedule">
				{appsList}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
