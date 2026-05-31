import { Alert } from 'react-native';

export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message === 'Network Error') {
    return 'Network error. Please check your connection.';
  }
  return 'An unexpected error occurred';
};

export const showErrorAlert = (error: any) => {
  const message = handleApiError(error);
  Alert.alert('Error', message);
};
