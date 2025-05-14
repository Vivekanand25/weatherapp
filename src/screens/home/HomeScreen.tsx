import {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {RootState} from '../../store';
import Styles from './styles';
import {useLoadPreferences} from '../../hooks/useLoadPreferences';
import {useWeatherActions} from '../../hooks/useWeatherActions';
import {useSelector} from 'react-redux';
import ErrorModal from '../../components/ErrorModal';
import {useNetworkStatus} from '../../hooks/useNetworkStatus';
import cityList from '../../assets/worldcities.json';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState<
    {city: string; country: string}[]
  >([]);
  const {isDarkMode, toggleTheme} = useLoadPreferences();
  const {handleSearch} = useWeatherActions(setQuery);
  useNetworkStatus();

  const {
    city: weatherCity,
    temperature,
    weatherCondition,
    weatherIcon,
    loading,
    error,
  } = useSelector((state: RootState) => state.weather);

  const handleInputChange = (text: string) => {
    setQuery(text);
    const filtered = cityList
      .filter(item => item.city.toLowerCase().startsWith(text.toLowerCase()))
      .slice(0, 10);
    setFilteredCities(filtered);
  };

  const handleSelectCity = (city: string) => {
    setQuery(city);
    Keyboard.dismiss();

    // Delay clearing suggestions to allow UI update
    setTimeout(() => {
      setFilteredCities([]);
    }, 100);

    handleSearch(city);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={isDarkMode ? Styles.containerDark : Styles.containerLight}>
        <Text style={isDarkMode ? Styles.titleDark : Styles.titleLight}>
          Weather App
        </Text>

        <View
          style={
            isDarkMode
              ? Styles.searchContainerDark
              : Styles.searchContainerLight
          }>
          <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            containerStyle={Styles.autocompleteContainerStyle}
            listContainerStyle={
              isDarkMode
                ? Styles.listContainerStyleDark
                : Styles.listContainerStyleLight
            }
            data={filteredCities.length > 0 ? filteredCities : []}
            defaultValue={query}
            onChangeText={handleInputChange}
            placeholder="Enter city name"
            flatListProps={{
              keyboardShouldPersistTaps: 'always',
              keyExtractor: (_, idx) => idx.toString(),
              renderItem: ({item}) => (
                <TouchableOpacity
                  onPress={() => handleSelectCity(item.city)}
                  style={
                    isDarkMode
                      ? Styles.suggestionItemDark
                      : Styles.suggestionItemLight
                  }>
                  <Text
                    style={
                      isDarkMode
                        ? Styles.suggestionTextDark
                        : Styles.suggestionTextLight
                    }>
                    {item.city}, {item.country}
                  </Text>
                </TouchableOpacity>
              ),
            }}
          />
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

        <TouchableOpacity
          style={
            isDarkMode ? Styles.toggleButtonDark : Styles.toggleButtonLight
          }
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
        <ErrorModal />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
