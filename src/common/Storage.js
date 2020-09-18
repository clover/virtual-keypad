import { STORAGE } from './constants';

export const set = value => {
  localStorage.setItem(STORAGE, btoa(JSON.stringify(value)));
};

export const get = () => {
  try {
    return JSON.parse(atob(localStorage.getItem(STORAGE) || 'bnVsbA=='));
  } catch (e) {
    return null;
  }
};
