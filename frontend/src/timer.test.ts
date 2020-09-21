import { getElapsedSeconds, Timer } from './timer';

describe('timer', () => {
  describe('#getElapsedSeconds', () => {
    describe('by default', () => {
      it('returns 0', () => {
        const timer: Timer = { points: [] };
        const result = getElapsedSeconds(timer, new Date());

        expect(result).toEqual(0);
      });
    });

    describe('with a single start point', () => {
      describe('unless a second has passed', () => {
        it('returns 0', () => {
          const now = new Date();
          const timer: Timer = { points: [{ time: now, type: 'start' }] };
          const result = getElapsedSeconds(timer, now);

          expect(result).toEqual(0);
        });
      });

      describe('if 10 seconds had passed', () => {
        it('returns 10', () => {
          const start = new Date(2020, 0, 1, 0, 0, 0);
          const now = new Date(2020, 0, 1, 0, 0, 10);
          const timer: Timer = { points: [{ time: start, type: 'start' }] };
          const result = getElapsedSeconds(timer, now);

          expect(result).toEqual(10);
        });
      });
    });

    describe('with points are start and pause', () => {
      describe('when 10 seconds have elapsed between start and pause', () => {
        describe('unless a second has passed', () => {
          it('returns 10', () => {
            const start = new Date(2020, 0, 1, 0, 0, 0);
            const pause = new Date(2020, 0, 1, 0, 0, 10);
            const now = new Date(2020, 0, 1, 0, 0, 10);
            const timer: Timer = {
              points: [
                { time: start, type: 'start' },
                { time: pause, type: 'pause' },
              ],
            };
            const result = getElapsedSeconds(timer, now);

            expect(result).toEqual(10);
          });
        });

        describe('if 10 seconds had passed after pause', () => {
          it('returns 10', () => {
            const start = new Date(2020, 0, 1, 0, 0, 0);
            const pause = new Date(2020, 0, 1, 0, 0, 10);
            const now = new Date(2020, 0, 1, 0, 0, 20);
            const timer: Timer = {
              points: [
                { time: start, type: 'start' },
                { time: pause, type: 'pause' },
              ],
            };
            const result = getElapsedSeconds(timer, now);

            expect(result).toEqual(10);
          });
        });
      });
    });

    describe('with points are start, pause and start', () => {
      describe('when 10 seconds have elapsed between the first start and the pause', () => {
        describe('unless a second has passed after the second start', () => {
          it('returns 10', () => {
            const start1 = new Date(2020, 0, 1, 0, 0, 0);
            const pause = new Date(2020, 0, 1, 0, 0, 10);
            const start2 = new Date(2020, 0, 1, 0, 0, 15);
            const now = new Date(2020, 0, 1, 0, 0, 15);
            const timer: Timer = {
              points: [
                { time: start1, type: 'start' },
                { time: pause, type: 'pause' },
                { time: start2, type: 'start' },
              ],
            };
            const result = getElapsedSeconds(timer, now);

            expect(result).toEqual(10);
          });
        });

        describe('if 30 seconds had passed after the second start', () => {
          it('returns 40', () => {
            const start1 = new Date(2020, 0, 1, 0, 0, 0);
            const pause = new Date(2020, 0, 1, 0, 0, 10);
            const start2 = new Date(2020, 0, 1, 0, 0, 15);
            const now = new Date(2020, 0, 1, 0, 0, 45);
            const timer: Timer = {
              points: [
                { time: start1, type: 'start' },
                { time: pause, type: 'pause' },
                { time: start2, type: 'start' },
              ],
            };
            const result = getElapsedSeconds(timer, now);

            expect(result).toEqual(40);
          });
        });
      });
    });
  });
});
