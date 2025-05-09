import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWeather, setDarkMode} from '../slices/weatherSlice';
import {RootState, AppDispatch} from '../store';

export const useLoadPreferences = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector(
    (state: RootState) => state.weather.isDarkMode,
  );

  useEffect(() => {
    const loadLastCity = async () => {
      const savedCity = await AsyncStorage.getItem('lastCity');
      if (savedCity) {
        dispatch(fetchWeather(savedCity));
      }
    };

    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('isDarkMode');
      if (savedTheme !== null) {
        dispatch(setDarkMode(savedTheme === 'true'));
      }
    };

    loadLastCity();
    loadTheme();
  }, [dispatch]);

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    dispatch(setDarkMode(newTheme));
    await AsyncStorage.setItem('isDarkMode', newTheme.toString());
  };

  return {isDarkMode, toggleTheme};
};
