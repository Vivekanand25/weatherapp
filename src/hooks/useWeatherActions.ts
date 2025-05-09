import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {fetchWeather, clearError, showModal} from '../slices/weatherSlice';
import {AppDispatch} from '../store';

export const useWeatherActions = (setCity: (value: string) => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = async (city: string) => {
    if (!city.trim()) {
      // Show modal with error message
      dispatch(
        showModal({
          title: 'Error',
          message: 'Please enter a city name.',
          isModalVisible: true,
        }),
      );
      return;
    }

    try {
      dispatch(clearError());
      dispatch(fetchWeather(city));
      await AsyncStorage.setItem('lastCity', city);
      setCity('');
    } catch (error) {
      // Show modal with error message
      dispatch(
        showModal({
          title: 'Error',
          message: 'Failed to fetch weather data.',
          isModalVisible: true,
        }),
      );
    }
  };

  useEffect(() => {
    const loadLastCity = async () => {
      const savedCity = await AsyncStorage.getItem('lastCity');
      if (savedCity) {
        dispatch(fetchWeather(savedCity));
      }
    };
    loadLastCity();
  }, [dispatch]);

  return {handleSearch};
};
