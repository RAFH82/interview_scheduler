import React from 'react';

import 'components/Appointment/styles.scss';

import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Status from 'components/Appointment/Status';
import Form from 'components/Appointment/Form';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

import useVisualMode from 'hooks/useVisualMode';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
	const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};

		transition(SAVING);

		props
			.bookInterview(props.id, interview)
			.then(() => {
				transition(SHOW);
			})
			.catch(() => {
				transition(ERROR_SAVE, true);
			});
	}

	function deleteInterview() {
		transition(DELETING, true);

		props
			.cancelInterview(props.id)
			.then(() => {
				transition(EMPTY);
			})
			.catch(() => {
				transition(ERROR_DELETE, true);
			});
	}

	return (
		<article className="appointment" data-testid="appointment">
			<Header time={props.time} />
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
			{mode === EDIT && (
				<Form
					name={props.interview.student}
					interviewers={props.interviewers}
					interviewer={props.interview.interviewer.id}
					onSave={save}
					onCancel={back}
				/>
			)}
			{mode === SAVING && <Status message={SAVING} />}
			{mode === DELETING && <Status message={DELETING} />}
			{mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={back} />}
			{mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={back} />}
			{mode === CONFIRM && (
				<Confirm message="Are you sure you would like to delete?" onConfirm={deleteInterview} onCancel={back} />
			)}
		</article>
	);
}
