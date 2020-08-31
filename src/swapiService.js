import axios from 'axios';

const swapiService = {
  getPeople: () => axios.get('https://swapi.dev/api/people/'),
  getFilm: (url) => axios.get(url),
};

export default swapiService;
