import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import swapiService from './swapiService';
import { personContext } from './person.context';

export const StyledContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  padding: 2rem;

  p {
    font-weight: bold;
    color: #F1FAEE;
  }

  h3 {
    font-weight: bold;
    color: #E63946;
  }
`;

export const StyledRow = styled.div`
  width: 15rem;
  background: #1D3557;
  padding: 2rem;
  margin: 1rem;

  &:hover {
    background: #457B9D;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

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

  const goToPerson = async (person) => {
    await setCurrentPerson(person);
    history.push('/person');
  };

  if (isLoading) {
    return <div>The application is loading</div>;
  }

  return (
    <StyledContainer>
      <h1>Star wars people:</h1>
      <FlexContainer>
      {people.map(person => (
        <StyledRow key={person.name} onClick={() =>goToPerson(person)}>
          <h3>name:</h3>
          <p>{person.name}</p>
          <h3>gender:</h3>
          <p>{person.gender}</p>
          <h3>birth year:</h3>
          <p>{person.birth_year}</p>
          <h3>height:</h3>
          <p>{person.height}</p>
          <h3>mass:</h3>
          <p>{person.mass}</p>
        </StyledRow>
      ))}
      </FlexContainer>
    </StyledContainer>
  )
};

export default People;
