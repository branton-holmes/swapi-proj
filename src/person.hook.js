import { useCallback, useState } from 'react';
import { personShape } from './person.context';

export const usePerson = () => {
  const [person, setPerson] = useState(personShape);

  const setCurrentPerson = useCallback((currentPerson) => {
    setPerson(currentPerson);
  }, [])

  return {
    person,
    setCurrentPerson,
  };
};