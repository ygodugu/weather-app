const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'b0011235ef5bece1b52b26b323021eb9';

export async function fetchWeatherData(lat, lon) {
  try {
    const weatherResponse = await fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastResponse = await fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (!weatherResponse.ok) {
      console.error(`Weather API returned status: ${weatherResponse.status}`);
      throw new Error('Failed to fetch weather data');
    }

    if (!forecastResponse.ok) {
      console.error(`Forecast API returned status: ${forecastResponse.status}`);
      throw new Error('Failed to fetch forecast data');
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();
    return [weatherData, forecastData];
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      console.error(`Geo API returned status: ${response.status}`);
      throw new Error('Failed to fetch city data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
}
