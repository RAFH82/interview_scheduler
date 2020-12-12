import { useState, useEffect } from 'react';
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({ 
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {} 
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

  function bookInterview(id, interview) {
      
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(res => {
      setState({...state, appointments});
    })
  }

  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({...state, appointments});
    })

  }

  const setDay = day => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview }

};