const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const form = document.querySelector('form')
const search = document.querySelector('#search');

window.addEventListener('load', e => {
  fetch_data()
  searchInput.value = ''  
})

document.addEventListener('readystatechange', e => {
    if (e.target.readyState === 'complete'){
        console.log("ready state: complete")
        fetch_data();
    }
})

const cities = [];

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const fetch_data = async () => {
    const fetch_request = new Request(endpoint)

    const fetch_response = await fetch(fetch_request)

    // console.log(fetch_response);

    const data = await fetch_response.json()

    // console.log(data)

    cities.push(...data)

    // console.log(cities) 

}

function findCities(cityToMatch, cities){
    return cities.filter(place => {
        const regex = new RegExp(cityToMatch,'gi')
        return place.city.match(regex) || place.state.match(regex)
    });
}

function displayCites(){
    const matchArray = findCities(this.value, cities)
    let html;

    if(this.value.trim() === ''){
      html = `<li class="flex justify-between capitalize p-5">Filter for a city</li>
              <li class="flex justify-between capitalize p-5">or a state</li>
              `
    } else {
      html = matchArray.map(place => {
      const regex = new RegExp(this.value, 'gi');

      const cityName = place.city.replace(regex, `<span class="hl text-yellow-300">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl text-yellow-300">${this.value}</span>`);
      return `
        <li class="searchedCiteis flex justify-between capitalize p-5">
          <span class="name">${cityName}, ${stateName}</span> 
          <span class="population">${numberWithCommas(place.population)}</span>
        </li>
      `;
      }).join('');
    }
    suggestions.innerHTML = html;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

searchInput.addEventListener('change', displayCites);
searchInput.addEventListener('keyup', displayCites);