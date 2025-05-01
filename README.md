# 🌤️ React Native Weather App

A simple React Native app (built with TypeScript) that fetches and displays current weather information for a searched city, using the WeatherAPI.

---

## 📱 Features

✅ Search for a city and display:
- City name  
- Current temperature  
- Weather condition (e.g., Cloudy, Sunny)  
- Weather icon  

✅ Show an error if the city is not found.

✅ Persist the last searched city using AsyncStorage and auto-load it when the app starts.

✅ State management using **Redux Toolkit** (without Redux Saga).

✅ Built for both **iOS** and **Android**.

---

## 🏗️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone <your-repo-url> / download and extract zip
cd WeatherApp
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up WeatherAPI key

- Go to [https://www.weatherapi.com/](https://www.weatherapi.com/) and sign up for a free account.
- Get your API key.
- In `src/services/weatherService.ts`, replace:
  
```ts
const API_KEY = 'YOUR_API_KEY';
```

with your actual key.

---

### 4️⃣ Run the app

For iOS:
```bash
npx pod-install
npx react-native run-ios
```

For Android:
```bash
npx react-native run-android
```

---

## 🏛️ Project Structure

```
/src
  /components       → Reusable UI components
  /screens          → App screens (e.g., HomeScreen)
  /slices           → Redux Toolkit slices
  /services         → API calls and external services
  /store            → Redux store setup
```

---

## ⚙️ Architectural Decisions

- **Redux Toolkit**: Simplifies state management, avoids boilerplate, and integrates `createAsyncThunk` for async API calls.
- **AsyncStorage**: Stores the last searched city persistently.
- **TypeScript**: Provides type safety across components, slices, and API services.
- **WeatherAPI**: Chosen for its clear API and free tier.
- **No Redux Saga**: We used `createAsyncThunk` for simplicity, avoiding the extra complexity of saga middleware.

---

## 🧪 Testing

- Unit tests can be added using **Jest** and **React Native Testing Library** (optional for the task).
