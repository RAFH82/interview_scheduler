import React   from 'react';

import 'components/Appointment/styles.scss';

import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Status from 'components/Appointment/Status';
import Form from 'components/Appointment/Form';
import Confirm from 'components/Appointment/Confirm';

import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";


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
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(EDIT)} onDelete={()=> transition(CONFIRM)} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()}/>}
      {mode === EDIT && <Form name={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} onSave={save} onCancel={() => back()}/>}
      {mode === SAVING && <Status message={SAVING}/>}
      {mode === DELETING && <Status message={DELETING}/>}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onConfirm={deleteInterview} onCancel={() => back()} />}
    </article>
  );
};