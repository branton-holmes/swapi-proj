import React from 'react';
import moxios from 'moxios';
import { render, waitFor, screen } from '@testing-library/react';
import People from './People';

const swapiResponse = {
  results: [
  {
    name: 'test mctestyface',
    gender: 'male',
    birth_year: 'long long ago',
    height: '1',
    mass: '2',
    films: [],
  },
  {
    name: 'john doe',
    gender: 'doesn\'t matter',
    birth_year: 'never',
    height: '125',
    mass: '12',
    films: [],
  },
  {
    name: 'Malla',
    gender: 'female',
    birth_year: 'Life Day',
    height: '7',
    mass: '300',
    films: [],
  },
]};

describe('Component: People', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('Renders list of people returned from the SWAPI', async () => {
    render(<People />);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: swapiResponse
      });
    });
    await waitFor(() => screen.getByText('name: test mctestyface'));
    const rows = await screen.findAllByRole('button');
    expect(rows.length).toEqual(3);
  })
});
