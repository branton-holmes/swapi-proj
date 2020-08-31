import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import swapiService from './swapiService';
import { personContext } from './person.context';

const People = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let history = useHistory();
  const { setCurrentPerson } = useContext(personContext);

  const fetchPeople = async () => {
    try {
      const response = await swapiService.getPeople();

      setPeople(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log('there was a problem fetching the list of people');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPeople();
  }, [])

  if (isLoading) {
    return <div>The application is loading</div>;
  }

  return (
    <div>
      <h1>Star wars people:</h1>
      {people.map(person => (
        <div key={person.name}>
          <p>name: {person.name}</p>
          <p>gender: {person.gender}</p>
          <p>birth year: {person.birth_year}</p>
          <p>height: {person.height}</p>
          <p>mass: {person.mass}</p>
          <button onClick={async () => {
            await setCurrentPerson(person);
            history.push('/person');
          }}>Go to film info</button>
        </div>
      ))}
    </div>
  )
};

export default People;
