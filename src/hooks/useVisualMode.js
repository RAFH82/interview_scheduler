import React, { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {

    const newHistory = [...history] // create fresh copy of history

    if (replace) {
      newHistory.pop()
    }

    newHistory.push(newMode)

    setMode(newMode);

    setHistory(newHistory);
  }

  const back = () => {

    const newHistory = [...history]

    if (newHistory.length < 2) {
      return;
    }
    
    newHistory.pop();

    setMode(newHistory[newHistory.length - 1]);

    setHistory(newHistory);
  };

  return { mode, transition, back }
};