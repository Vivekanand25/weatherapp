import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {setNetworkStatus, showModal} from '../slices/weatherSlice';
import {AppDispatch} from '../store';

export const useNetworkStatus = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isConnected));
      if (!state.isConnected) {
        dispatch(
          showModal({
            title: 'No Internet Connection',
            message: 'Please check your internet connection and try again.',
            isModalVisible: true,
          }),
        );
      } else {
        dispatch(
          showModal({
            title: '',
            message: '',
            isModalVisible: false,
          }),
        );
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
};
