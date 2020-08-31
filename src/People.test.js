import React from 'react';
import { render } from '@testing-library/react';
import People from './People';

test('Renders list of people returned from the SWAPI', () => {
  const { getByText } = render(<People />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
