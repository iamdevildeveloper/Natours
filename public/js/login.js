import axios from 'axios';
import { showAlert } from './alerts.js';

export const login = async (email, password) => {
  try {
    const result = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:7777/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (result.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      });
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const result = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:7777/api/v1/users/logout',
    });
    if (result.data.status === 'success') {
      showAlert('success', 'Please visit again. Have a nice day.');
      window.setTimeout(() => {
        location.reload(true);
      });
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
    console.log(err);
  }
};
