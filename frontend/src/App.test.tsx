import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Pomodoro Together', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Pomodoro Together/i);
  expect(linkElement).toBeInTheDocument();
});
