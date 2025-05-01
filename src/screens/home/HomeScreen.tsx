import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../../slices/weatherSlice';
import { RootState, AppDispatch } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './styles';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { city: weatherCity, temperature, weatherCondition, weatherIcon, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    const loadLastCity = async () => {
      const savedCity = await AsyncStorage.getItem('lastCity');
      if (savedCity) {
        dispatch(fetchWeather(savedCity));
      }
    };
    loadLastCity();
  }, [dispatch]);

  const handleSearch = async () => {
    if (city) {
      dispatch(fetchWeather(city));
      await AsyncStorage.setItem('lastCity', city);
      setCity('');
    }
  };

  // Toggle between light and dark modes
  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem('isDarkMode', newTheme.toString());
  };

  // Use persisted theme (optional)
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('isDarkMode');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'true');
      }
    };
    loadTheme();
  }, []);

  return (
    <View style={isDarkMode ? Styles.containerDark : Styles.containerLight}>
      {/* Title */}
      <Text style={isDarkMode ? Styles.titleDark : Styles.titleLight}>Weather App</Text>

      <View style={isDarkMode ? Styles.searchContainerDark : Styles.searchContainerLight}>
        <TextInput
          style={isDarkMode ? Styles.inputDark : Styles.inputLight}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={isDarkMode ? Styles.searchButtonDark : Styles.searchButtonLight} onPress={handleSearch}>
          <Text style={isDarkMode ? Styles.searchButtonTextDark : Styles.searchButtonTextLight}>🔍</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={isDarkMode ? Styles.errorDark : Styles.errorLight}>{error}</Text>}

      {weatherCity && !loading && (
        <View style={isDarkMode ? Styles.cardDark : Styles.cardLight}>
          <Text style={isDarkMode ? Styles.cityDark : Styles.cityLight}>{weatherCity}</Text>
          <Text style={isDarkMode ? Styles.temperatureDark : Styles.temperatureLight}>{temperature}°C</Text>
          <Text style={isDarkMode ? Styles.weatherConditionDark : Styles.weatherConditionLight}>{weatherCondition}</Text>
          <Image
            source={{ uri: weatherIcon }}
            style={Styles.icon}
          />
        </View>
      )}

      {/* Dark mode toggle button */}
      <TouchableOpacity style={isDarkMode ? Styles.toggleButtonDark : Styles.toggleButtonLight} onPress={toggleTheme}>
        <Text style={isDarkMode ? Styles.toggleButtonTextDark : Styles.toggleButtonTextLight}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
