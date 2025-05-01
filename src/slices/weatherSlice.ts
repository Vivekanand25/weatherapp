import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherByCity } from '../services/weatherService';

export interface WeatherState {
  city: string;
  temperature: number;
  weatherCondition: string;
  weatherIcon: string;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  city: '',
  temperature: 0,
  weatherCondition: '',
  weatherIcon: '',
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const data = await fetchWeatherByCity(city);
      return data;
    } catch (error) {
      return rejectWithValue('City not found');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
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
      });
  },
});

export default weatherSlice.reducer;
