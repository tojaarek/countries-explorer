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
          <svg><use href="https://flagcdn.com/pl.svg"></use></svg>
            <span class="country-name">${country.name}</span>
          </li>
        `;
    })
    .join('');
  if (countries.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    countryList.innerHTML = results;
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
  }
}
const debouncedSearch = debounce(searchCountries, DEBOUNCE_DELAY);
searchInput.addEventListener('input', debouncedSearch);
