import weatherReducer, {
  showModal,
  hideModal,
  toggleDarkMode,
} from '../src/slices/weatherSlice';

const initialState = {
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

describe('weatherSlice reducer', () => {
  it('should handle initial state', () => {
    expect(weatherReducer(undefined, {type: ''})).toEqual(initialState);
  });

  it('should handle showModal', () => {
    const action = showModal({
      title: 'Error',
      message: 'Something went wrong',
      isModalVisible: true,
    });
    const state = weatherReducer(initialState, action);
    expect(state.modalTitle).toBe('Error');
    expect(state.modalMessage).toBe('Something went wrong');
    expect(state.isModalVisible).toBe(true);
  });

  it('should handle hideModal', () => {
    const state = weatherReducer(
      {
        ...initialState,
        isModalVisible: true,
        modalTitle: 'Test',
        modalMessage: 'Message',
      },
      hideModal(),
    );
    expect(state.isModalVisible).toBe(false);
    expect(state.modalTitle).toBe('');
    expect(state.modalMessage).toBe('');
  });

  it('should handle toggleDarkMode', () => {
    const state = weatherReducer(initialState, toggleDarkMode());
    expect(state.isDarkMode).toBe(true);
  });
});
