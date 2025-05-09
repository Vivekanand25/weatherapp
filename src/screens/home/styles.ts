import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  // Light Mode Styles
  containerLight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  titleLight: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 20,
  },
  searchContainerLight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  inputLight: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '70%',
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  searchButtonLight: {
    backgroundColor: '#1E90FF',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 2,
  },
  searchButtonTextLight: {
    color: '#fff',
    fontSize: 20,
  },
  cardLight: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  cityLight: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperatureLight: {
    fontSize: 20,
    color: '#888',
  },
  weatherConditionLight: {
    fontSize: 18,
    color: '#555',
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  errorLight: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  toggleButtonLight: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
  },
  toggleButtonTextLight: {
    color: '#fff',
    fontSize: 16,
  },

  // Dark Mode Styles
  containerDark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#121212',
  },
  titleDark: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#BB86FC',
    marginBottom: 20,
  },
  searchContainerDark: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  inputDark: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
    width: '70%',
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#555',
    color: '#fff',
  },
  searchButtonDark: {
    backgroundColor: '#BB86FC',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 2,
  },
  searchButtonTextDark: {
    color: '#fff',
    fontSize: 20,
  },
  cardDark: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#444',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#333',
    elevation: 3,
  },
  cityDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BB86FC',
  },
  temperatureDark: {
    fontSize: 20,
    color: '#BBB',
  },
  weatherConditionDark: {
    fontSize: 18,
    color: '#CCC',
  },
  errorDark: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  toggleButtonDark: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#BB86FC',
    borderRadius: 10,
  },
  toggleButtonTextDark: {
    color: '#fff',
    fontSize: 16,
  },
  placeholderLight: {
    color: '#555',
  },
  placeholderDark: {
    color: '#ccc',
  },
});

export default Styles;
