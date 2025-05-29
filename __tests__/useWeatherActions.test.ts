import React from 'react';
import {renderHook, act} from '@testing-library/react-native';
import {useWeatherActions} from '../src/hooks/useWeatherActions';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('useWeatherActions', () => {
  it('dispatches fetchWeather when handleSearch is called', async () => {
    const setCityMock = jest.fn();
    const store = mockStore({});

    const wrapper = ({children}: {children: React.ReactNode}) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(() => useWeatherActions(setCityMock), {
      wrapper,
    });

    await act(async () => {
      await result.current.handleSearch('London');
    });

    const actions = store.getActions();
    expect(
      actions.some(action => action.type.includes('fetchWeather')),
    ).toBeTruthy();
  });
});
