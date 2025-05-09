import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchWeatherByCity} from '../services/weatherService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../store';

export interface WeatherState {
  city: string;
  temperature: number;
  weatherCondition: string;
  weatherIcon: string;
  loading: boolean;
  error: string | null;
  isModalVisible: boolean;
  modalTitle: string;
  modalMessage: string;
  isConnected: boolean;
  isDarkMode: boolean;
}

const initialState: WeatherState = {
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
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, {rejectWithValue}) => {
    try {
      const data = await fetchWeatherByCity(city);
      return data;
    } catch (error) {
      await AsyncStorage.removeItem('lastCity');
      if (error instanceof Error && error.message === 'Network Error') {
        showModal({
          title: 'No Internet Connection',
          message: 'Please check your internet connection and try again.',
          isModalVisible: true,
        });
        return rejectWithValue('No Internet Connection');
      } else {
        return rejectWithValue('City not found');
      }
    }
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    showModal: (state, action) => {
      state.isModalVisible = action.payload.isModalVisible;
      state.modalTitle = action.payload.title;
      state.modalMessage = action.payload.message;
    },
    hideModal: state => {
      state.isModalVisible = false;
      state.modalTitle = '';
      state.modalMessage = '';
    },
    setNetworkStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    toggleDarkMode: state => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;
        state.temperature = action.payload.temperature;
        state.weatherCondition = action.payload.weatherCondition;
        state.weatherIcon = action.payload.weatherIcon;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isModalVisible = true;
        state.modalTitle = 'Error';
        state.modalMessage = state.error || 'An error occurred';
      });
  },
});

export const selectNetworkStatus = (state: RootState) =>
  state.weather.isConnected;
export const {
  clearError,
  showModal,
  hideModal,
  setNetworkStatus,
  setDarkMode,
  toggleDarkMode,
} = weatherSlice.actions;
export default weatherSlice.reducer;
