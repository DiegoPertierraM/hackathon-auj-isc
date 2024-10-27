import { User } from '../interfaces/User.interface';

export const saveUserData = (userData: User) => {
  console.log({ userData });
  localStorage.setItem('userData', JSON.stringify(userData));
};

export const removeUserData = () => {
  localStorage.removeItem('userData');
};

export const getUserData = (): User | null => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};
