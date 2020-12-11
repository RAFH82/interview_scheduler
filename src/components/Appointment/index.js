import React   from 'react';

import 'components/Appointment/styles.scss';

import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Status from 'components/Appointment/Status';
import Form from 'components/Appointment/Form';

import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

export default function Appointment(props) { 

  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW)});

  }

  function deleteInterview() {
    transition(DELETING);

    props.cancelInterview(props.id)
    .then(() => {transition(EMPTY)});
  }
 
  return (
    <article className="appointment">
      <Header
      time={props.time}
      />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={null} onDelete={deleteInterview} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()}/>}
      {mode === SAVING && <Status message={SAVING}/>}
      {mode === DELETING && <Status message={DELETING}/>}
    </article>
  );
};