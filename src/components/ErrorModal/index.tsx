import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {RootState} from '../../store';
import {hideModal} from '../../slices/weatherSlice';
import {modalStyles} from './styles';

const ErrorModal = () => {
  const dispatch = useDispatch();
  const {isModalVisible, modalTitle, modalMessage, isDarkMode} = useSelector(
    (state: RootState) => state.weather,
  );

  const handleCloseModal = () => {
    dispatch(hideModal());
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={handleCloseModal}
      onBackButtonPress={handleCloseModal}
      style={modalStyles.modalWrapper}>
      <View
        style={
          isDarkMode ? modalStyles.containerDark : modalStyles.containerLight
        }>
        <Text
          style={isDarkMode ? modalStyles.titleDark : modalStyles.titleLight}>
          {modalTitle}
        </Text>
        <Text
          style={
            isDarkMode ? modalStyles.messageDark : modalStyles.messageLight
          }>
          {modalMessage}
        </Text>

        <TouchableOpacity
          onPress={handleCloseModal}
          style={isDarkMode ? modalStyles.buttonDark : modalStyles.buttonLight}>
          <Text
            style={
              isDarkMode
                ? modalStyles.buttonTextDark
                : modalStyles.buttonTextLight
            }>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ErrorModal;
