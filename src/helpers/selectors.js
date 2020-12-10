
export default function getAppointmentsForDay(state, day) {
  const dayObj = state.days.find(dayObj => dayObj.name === day);
  const results = [];
    if (dayObj) {  
      for (const app of dayObj.appointments) {
      results.push(state.appointments[app])
    }
  }
  return results;
};

