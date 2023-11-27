function getWeather() {
    let cityName = document.getElementById('city').value
    let countryName = document.getElementById('country').value
    let weatherApiKey = '887d3bf7bbb999a31bef83abe8e287a5'
    let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=${weatherApiKey}&units=imperial`
    
    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data)
            getUnsplashImage(cityName, countryName)
        })
        .catch(error => {
            console.error('Error:', error)
        })
}

function displayWeather(data) {
    let temperatureFahrenheit = (data.main.temp)
    let feelsLike = (data.main.feels_like)
    let weatherInfoDiv = document.getElementById('weatherInfo')
    weatherInfoDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${temperatureFahrenheit.toFixed(0)}° F</p>
        <p>High: ${data.main.temp_max.toFixed(0)}° F</p>
        <p>Low: ${data.main.temp_min.toFixed(0)}° F</p>
        <p>Feels Like: ${feelsLike.toFixed(0)}° F</p>
        <p>Current Conditions: ${data.weather[0].main}</p>
        <p>Forecast: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `
}

// function kelvinToFahrenheit(kelvin) {
//     return (kelvin - 273.15) * 9/5 + 32
// }

function getUnsplashImage(city, country) {
    let unsplashApiKey = 'WnNkEwB5wHjGRMNUxX9u0bBdGqH8zGSIRNSUHJknE24'
    let unsplashApiUrl = `https://api.unsplash.com/search/photos/?client_id=${unsplashApiKey}&query=${city},${country}`

    fetch(unsplashApiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                console.log('Error occured in Unsplash API:', data.errors[0])
            } else {
                const photo = data.results[0]
                displayUnsplashImage(photo)
            }            
        })
        .catch(error => {
            console.error('Error in Unsplash API:', error)
        })
}

function displayUnsplashImage(photo) {
    let weatherInfoDiv = document.getElementById('weatherInfo')
    weatherInfoDiv.innerHTML += `
        <img src="${photo.urls.regular}" alt="${photo.alt_description}" style="max-width: 100%;">
    `
}