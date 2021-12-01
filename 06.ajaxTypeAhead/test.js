window.addEventListener('load', () => {

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = []
const matchedPlaces = []

const getData = async endpoint => {
    const res = await fetch(endpoint)
    return await res.json()
}

getData(endpoint)
    .then(data => {
        cities.push(...data)
    })

function filterPlaces(word, cities) {
    const result = cities.filter(place => {
        const regex = new RegExp(word, 'gi')
        return place.city.match(regex) || place.state.match(regex)
    })
    return matchedPlaces.push(...result)
}

const search = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')
suggestions.innerHTML = `<li>Filter for a city</li><li>or state</li>`

function handleDefaultSuggestions() {
    if(this.value === '') {
        suggestions.innerHTML = `<li>Filter for a city</li><li>or state</li>`
    } else if (!matchedPlaces.length) {
        suggestions.innerHTML = `<li>No matches. Try changing the word</li>`
    }
    filterPlaces(this.value, cities)
    matchedPlaces.forEach(place => {
        console.log(place)
    })
}

search.addEventListener('keyup', handleDefaultSuggestions)

/**
 * si al addEventListener, le paso una arrow fn como callback, el this es global
 * 
 * */ 

})