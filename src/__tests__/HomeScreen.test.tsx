import React from 'react';
import {render} from '@testing-library/react-native';
import HomeScreen from '../screens/home/HomeScreen';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const store = mockStore({
      weather: {
        city: '',
        temperature: 0,
        weatherCondition: '',
        weatherIcon: '',
        loading: false,
        error: null,
        isModalVisible: false,
        modalTitle: '',
        modalMessage: '',
        isConnected: true,
        isDarkMode: false,
      },
    });

    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>,
    );

    expect(getByPlaceholderText('Enter city name')).toBeTruthy();
  });
});
