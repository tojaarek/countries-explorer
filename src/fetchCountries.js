import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const searchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  return fetch(`https://restcountries.com/v3.1/name/${name}?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const countries = data.map(country => ({
        name: country.name.official,
        capital: Object.values(country.capital),
        population: country.population,
        flag: country.flags.svg,
        alt: country.flags.alt,
        languages: Object.values(country.languages),
      }));
      return countries;
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name', {
        fontFamily: 'Press Start 2P',
      });
    });
}
