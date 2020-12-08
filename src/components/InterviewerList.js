import React from 'react';

import interviewerListItem from 'components/interviewerListItem';
import 'components/InterviewerList.scss';

export default function InterviewerListItem(props) { 

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
};