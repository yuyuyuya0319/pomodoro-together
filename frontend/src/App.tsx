import React, { useEffect, useState } from 'react';
import './App.css';
import {
  createNewWorkPomodoroTimer,
  getRemainingSeconds,
  getState,
  Timer,
  toggle,
} from './timer';

const zeropad = (number: number): string => {
  const len = String(number).length;
  return `${len === 1 ? '0' : ''}${number}`;
};

const formatClock = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${zeropad(minutes)}:${zeropad(seconds)}`;
};

const getClockClassName = (timer: Timer): string => {
  const state = getState(timer, new Date());
  return `PomodoroTimer-clock PomodoroTimer-clock-${state}`;
};

const getButtonLabel = (timer: Timer): string => {
  const state = getState(timer, new Date());
  switch (state) {
    case 'start':
      return 'Pause';

    case 'pause':
      return 'Start';
  }

  return 'Restart';
};

const PomodoroTimer = () => {
  const [timer, setTimer] = useState<Timer>(createNewWorkPomodoroTimer());
  const [remainingSeconds, setRemainingSeconds] = React.useState(
    getRemainingSeconds(timer, new Date()),
  );
  const timerState = getState(timer, new Date());

  const toggleTimer = () => {
    setTimer(toggle(timer, new Date()));
  };

  const clearTimer = () => {
    if (window.confirm('OK?')) {
      setTimer(createNewWorkPomodoroTimer());
    }
  };

  const updateRemainingSeconds = () => {
    const seconds = getRemainingSeconds(timer, new Date());
    setRemainingSeconds(seconds);
  };

  useEffect(() => {
    const intervalId = setInterval(updateRemainingSeconds, 100);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <>
      <div className={getClockClassName(timer)}>
        {formatClock(remainingSeconds)}
      </div>
      {timerState !== 'done' && (
        <input
          type="button"
          value={getButtonLabel(timer)}
          onClick={() => toggleTimer()}
        />
      )}
      <input type="button" value="Clear" onClick={() => clearTimer()} />
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header">Pomodoro Together</header>
      <PomodoroTimer />
    </div>
  );
};

export default App;
