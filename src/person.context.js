import React from 'react';

export const personShape = {
  name: null,
  gender: null,
  birth_year: null,
  height: null,
  mass: null,
  films: [],
};

export const personContext = React.createContext(personShape);
