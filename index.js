const searchForm = document.querySelector('form');
const searchInput = document.getElementById('search-input');
const tableBody = document.getElementById('country-table-body');
let countries = [];

function displayCountries(countries) {
  // Clear existing table rows
  tableBody.innerHTML = '';

  // Iterate over the data and create a table row for each country
  countries.forEach(country => {
    const row = document.createElement('div');
    const nameCell = document.createElement('h3');
    nameCell.innerHTML = country.name +"<br>";
    const flagCell = document.createElement('p');
    const flagImg = document.createElement('img');
    flagImg.src = country.flag;
    flagImg.alt = `${country.name} Flag`;
    flagCell.appendChild(flagImg);
    const capitalCell = document.createElement('p');
    capitalCell.innerHTML ="CAPITAL:"+ country.capital;
    const populationCell = document.createElement('p');
    populationCell.innerHTML = "POPULATION:"+country.population;
    const regionCell = document.createElement('p');
    regionCell.innerHTML = "REGION:"+country.region;
    row.appendChild(nameCell);
    row.appendChild(flagCell);
    row.appendChild(capitalCell);
    row.appendChild(populationCell);
    row.appendChild(regionCell);
    tableBody.appendChild(row);
  });
}

function filterCountries(searchTerm) {
  return countries.filter(country => {
    return country.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
}

fetch('https://restcountries.com/v2/all')
  .then(response => response.json())
  .then(data => {
    countries = data;
    console.log(countries)
    displayCountries(countries);
  })
  .catch(error => console.error(error));

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  const filteredCountries = filterCountries(searchTerm);
  displayCountries(filteredCountries);
});
