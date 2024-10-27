import { User } from '../interfaces/User.interface';

export const saveUserData = (userData: User) => {
  const { token, ...restData } = userData;
  localStorage.setItem('userData', JSON.stringify(restData));
  localStorage.setItem('token', JSON.stringify(token));
};

export const removeUserData = () => {
  localStorage.removeItem('userData');
  localStorage.removeItem('token');
};

export const getUserDataFromStorage = (): User | null => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};
