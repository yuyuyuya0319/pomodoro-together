export interface Timer {
  points: Point[];
}

export interface PomodoroTimer extends Timer {
  type: PomodoroTimerType;
  totalSeconds: number;
}

type PomodoroTimerType = 'work' | 'break';

export interface WorkPomodoroTimer extends PomodoroTimer {
  type: 'work';
}

export interface BreakPomodoroTimer extends PomodoroTimer {
  type: 'break';
}

export const createNewWorkPomodoroTimer = (): WorkPomodoroTimer => {
  return {
    type: 'work',
    totalSeconds: 60 * 25,
    points: [],
  };
};

export const createNewBreakPomodoroTimer = (): BreakPomodoroTimer => {
  return {
    type: 'break',
    totalSeconds: 60 * 5,
    points: [],
  };
};

interface Point {
  time: Date;
  type: PointType;
}

type PointType = 'start' | 'pause';

export const getElapsedSeconds = (timer: Timer, now: Date): number => {
  let milliseconds: number = 0;
  let lastPoint: Point | undefined;

  for (const point of timer.points) {
    if (point.type === 'pause' && lastPoint?.type === 'start') {
      milliseconds += point.time.getTime() - lastPoint.time.getTime();
    }

    lastPoint = point;
  }

  if (lastPoint?.type === 'start') {
    milliseconds += now.getTime() - lastPoint.time.getTime();
  }

  return Math.floor(milliseconds / 1000);
};
