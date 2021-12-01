window.addEventListener('load', () => {

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = []

const search =  document.querySelector('.search')
const suggestions =  document.querySelector('.suggestions')

fetch(endpoint)
    .then(res => res.json())
    .then(data => cities.push(...data))

function findMatches(word, cities) {
    return cities.filter( place => {
        const regex = new RegExp(word, 'gi')
        return place.city.match(regex) || place.state.match(regex)
    })
}

function displayMatches() {
    suggestions.innerHTML = ''
    findMatches(this.value, cities)
        .forEach(place => {
            const test = document.createElement('li')
            test.innerHTML = place.city
            suggestions.appendChild(test)
        })
}

search.addEventListener('keyup', displayMatches)

})