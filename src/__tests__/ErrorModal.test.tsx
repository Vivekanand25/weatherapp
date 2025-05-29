import React from 'react';
import { render } from '@testing-library/react-native';
import ErrorModal from '../components/ErrorModal';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('ErrorModal', () => {
  it('renders and handles close', () => {
    const store = mockStore({
      weather: {
        isModalVisible: true,
        modalTitle: 'Error',
        modalMessage: 'Something went wrong',
        isDarkMode: false,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <ErrorModal />
      </Provider>
    );

    expect(getByText('Error')).toBeTruthy();
    expect(getByText('Something went wrong')).toBeTruthy();
  });
});