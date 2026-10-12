const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const loadingDiv = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const weatherCard = document.getElementById('weather-card');

const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const city = cityInput.value.trim();
    
    if (city === '') {
        showError('please enter your city!');
        return;
    }
    
    getWeatherData(city);
});

async function getWeatherData(city) {
    try {
        showLoading();
        
        const url = `https://wttr.in/${city}?format=j1`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('this city is not exist!');
        }
        
        const data = await response.json();
        
        const currentCondition = data.current_condition[0];
        const weatherText = currentCondition.weatherDesc[0].value;
        const tempC = currentCondition.temp_C;
        
        const weatherData = {
            name: city,
            temp: tempC,
            description: weatherText
        };
        
        displayWeather(weatherData);
        
    } catch (error) {
        showError('no more data about this city');
    }
}

function displayWeather(data) {
    loadingDiv.classList.add('hidden');
    errorMessage.classList.add('hidden');
    weatherCard.classList.remove('hidden');
    
    cityName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    temperature.textContent = `${data.temp}°C`;
    weatherDescription.textContent = data.description;
    
    weatherIcon.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png';
}

function showLoading() {
    loadingDiv.classList.remove('hidden');
    weatherCard.classList.add('hidden');
    errorMessage.classList.add('hidden');
}

function showError(message) {
    loadingDiv.classList.add('hidden');
    weatherCard.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = message;
}