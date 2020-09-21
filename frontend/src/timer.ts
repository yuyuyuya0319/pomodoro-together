export interface Timer {
  totalSeconds: number;
  points: Point[];
}

export interface PomodoroTimer extends Timer {
  type: PomodoroTimerType;
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
type TimerState = PointType | 'done';

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

export const getRemainingSeconds = (timer: Timer, now: Date): number => {
  const elapsed = getElapsedSeconds(timer, now);
  const result = timer.totalSeconds - elapsed;

  return result < 0 ? 0 : result;
};

export const getState = (timer: Timer, now: Date): TimerState => {
  if (timer.points.length === 0) {
    return 'pause';
  }

  const remaining = getRemainingSeconds(timer, now);
  if (remaining === 0) {
    return 'done';
  }

  return timer.points[timer.points.length - 1].type;
};

export const toggle = (timer: Timer, now: Date): Timer => {
  if (timer.points.length === 0) {
    return {
      ...timer,
      points: [{ type: 'start', time: now }],
    };
  }

  const lastPoint = timer.points[timer.points.length - 1];

  return {
    ...timer,
    points: [
      ...timer.points,
      {
        type: reversePointType(lastPoint.type),
        time: now,
      },
    ],
  };
};

const reversePointType = (state: PointType): PointType => {
  return state === 'start' ? 'pause' : 'start';
};
