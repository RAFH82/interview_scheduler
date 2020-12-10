
const getAppointmentsForDay = (state, day) => {
  const dayObj = state.days.find(dayObj => dayObj.name === day);
  const results = [];
    if (dayObj) {  
      for (const app of dayObj.appointments) {
      results.push(state.appointments[app])
    }
  }
  return results;
};

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const interviewerObj = state.interviewers[interviewerId]; 
  const newObj = {...interview, interviewer: {...interviewerObj }};
  return newObj;

};

export { getAppointmentsForDay, getInterview };