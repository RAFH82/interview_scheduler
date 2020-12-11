
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

const getInterviewersForDay  = (state, day) => {
  const dayObj = state.days.find(dayObj => dayObj.name === day);
  const results = [];
    if (dayObj) {  
      for (const app of dayObj.interviewers) {
      results.push(state.interviewers[app])
    }
  }
  return results;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay  };