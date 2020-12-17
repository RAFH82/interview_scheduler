import { useState } from 'react';

export default function useVisualMode(initial) {
	const [history, setHistory] = useState([initial]);

	const transition = (newMode, replace = false) => {
		setHistory((prev) => {
			const newHistory = [...prev];
			if (replace) {
				newHistory.pop();
			}

			newHistory.push(newMode);
			return newHistory;
		});
	};

	const back = () => {
		setHistory((prev) => {
			const newHistory = [...prev];

			if (newHistory.length < 2) {
				return prev;
			}

			newHistory.pop();

			return newHistory;
		});
	};

	return { mode: history[history.length - 1], transition, back };
}
