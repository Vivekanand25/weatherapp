import axios from 'axios';

const API_KEY = '34b88c4dc16e4fdcb9144819251605';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeatherByCity = async (city: string) => {
  const response = await axios.get(`${BASE_URL}/current.json`, {
    params: {
      key: API_KEY,
      q: city,
    },
  });

  const data = response.data;

  return {
    city: data.location.name,
    temperature: data.current.temp_c,
    weatherCondition: data.current.condition.text,
    weatherIcon: `https:${data.current.condition.icon}`,
  };
};
