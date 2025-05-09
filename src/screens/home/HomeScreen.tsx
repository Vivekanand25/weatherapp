import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RootState} from '../../store';
import Styles from './styles';
import {useLoadPreferences} from '../../hooks/useLoadPreferences';
import {useWeatherActions} from '../../hooks/useWeatherActions';
import {useSelector} from 'react-redux';
import ErrorModal from '../../components/ErrorModal';
import {useNetworkStatus} from '../../hooks/useNetworkStatus';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const {isDarkMode, toggleTheme} = useLoadPreferences();
  const {handleSearch} = useWeatherActions(setCity);
  useNetworkStatus();
  const {
    city: weatherCity,
    temperature,
    weatherCondition,
    weatherIcon,
    loading,
    error,
  } = useSelector((state: RootState) => state.weather);

  return (
    <View style={isDarkMode ? Styles.containerDark : Styles.containerLight}>
      <Text style={isDarkMode ? Styles.titleDark : Styles.titleLight}>
        Weather App
      </Text>

      <View
        style={
          isDarkMode ? Styles.searchContainerDark : Styles.searchContainerLight
        }>
        <TextInput
          style={isDarkMode ? Styles.inputDark : Styles.inputLight}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          placeholderTextColor={
            isDarkMode
              ? Styles.placeholderDark.color
              : Styles.placeholderLight.color
          }
          autoCorrect={false}
          autoComplete="off"
          spellCheck={false}
          textContentType="none"
          keyboardType="default"
        />
        <TouchableOpacity
          style={
            isDarkMode ? Styles.searchButtonDark : Styles.searchButtonLight
          }
          onPress={() => handleSearch(city)}>
          <Text
            style={
              isDarkMode
                ? Styles.searchButtonTextDark
                : Styles.searchButtonTextLight
            }>
            🔍
          </Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && (
        <Text style={isDarkMode ? Styles.errorDark : Styles.errorLight}>
          {error}
        </Text>
      )}

      {weatherCity && !loading && (
        <View style={isDarkMode ? Styles.cardDark : Styles.cardLight}>
          <Text style={isDarkMode ? Styles.cityDark : Styles.cityLight}>
            {weatherCity}
          </Text>
          <Text
            style={
              isDarkMode ? Styles.temperatureDark : Styles.temperatureLight
            }>
            {temperature}°C
          </Text>
          <Text
            style={
              isDarkMode
                ? Styles.weatherConditionDark
                : Styles.weatherConditionLight
            }>
            {weatherCondition}
          </Text>
          <Image source={{uri: weatherIcon}} style={Styles.icon} />
        </View>
      )}

      {/* Dark mode toggle button */}
      <TouchableOpacity
        style={isDarkMode ? Styles.toggleButtonDark : Styles.toggleButtonLight}
        onPress={toggleTheme}>
        <Text
          style={
            isDarkMode
              ? Styles.toggleButtonTextDark
              : Styles.toggleButtonTextLight
          }>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </Text>
      </TouchableOpacity>
      {/* Display error modal */}
      <ErrorModal />
    </View>
  );
};

export default HomeScreen;
