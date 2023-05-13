import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function displayResults(countries) {
  const results = countries
    .map(country => {
      return `
          <li class="country-item">
          <svg width="50"><use href="${country.flag}"></use></svg>
          <p class="country-item__name">${country.name}</p>
          </li>
        `;
    })
    .join('');
  const details = countries.map(country => {
    return `
    <ul>
    <li class="country-info__name">
    <svg width="50"><use href="${country.flag}"></use></svg>
    <p class="country-name">${country.name}</p>
    </li>
    <li class="country-info__details">
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Languages: ${country.languages}</p>
    </li>
    </ul>
      `;
  });
  if (countries.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.',
      {
        fontFamily: 'Press Start 2P',
      }
    );
  } else if (countries.length === 1) {
    countryInfo.innerHTML = details;
    countryList.innerHTML = '';
  } else {
    countryList.innerHTML = results;
    countryInfo.innerHTML = '';
  }
}

function searchCountries() {
  const searchedCountry = searchInput.value.trim();
  if (searchedCountry.length > 2) {
    fetchCountries(searchedCountry)
      .then(countries => displayResults(countries))
      .catch(error => console.error(error));
  } else {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
}
const debouncedSearch = debounce(searchCountries, DEBOUNCE_DELAY);
searchInput.addEventListener('input', debouncedSearch);
