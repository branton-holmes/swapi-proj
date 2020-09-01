import React, { useContext, useEffect, useState } from 'react';
import swapiService from './swapiService';
import { personContext } from './person.context';
import { StyledContainer, StyledRow, FlexContainer } from './People';

const People = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { person } = useContext(personContext);

  const fetchFilms = async (films) => {
    let data = films.map(film => swapiService.getFilm(film));
    Promise.all(data).then((values) => {
      const filmList = values.map((value) => value.data);
      setFilms(filmList);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchFilms(person.films);
  }, [person.films])

  if (isLoading) {
    return <div>The application is loading</div>;
  }

  return (
    <StyledContainer>
      <h1>Person:</h1>
      <StyledRow>
        <p>name: {person.name}</p>
        <p>gender: {person.gender}</p>
        <p>birth year: {person.birth_year}</p>
        <p>height: {person.height}</p>
        <p>mass: {person.mass}</p>
      </StyledRow>
      <h1>Films:</h1>
      <FlexContainer>
      {films.map(film => (
        <StyledRow key={film.title}>
          <p>title: {film.title}</p>
          <p>release date: {film.release_date}</p>
          <p>producer: {film.producer}</p>
          <p>director: {film.director}</p>
        </StyledRow>
      ))}
      </FlexContainer>
    </StyledContainer>
  )
};

export default People;
