import axios from 'axios';
import { showAlert } from './alerts.js';

// type is either password or data (email, name)
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:7777/api/v1/users/updatePassword'
        : 'http://127.0.0.1:7777/api/v1/users/updateMe';
    const result = await axios({
      method: 'PATCH',
      url,
      data: data,
    });

    if (result.data.status === 'success') {
      showAlert('success', 'Data updated successfully !');
      window.setTimeout(() => {
        location.assign('/me');
      });
    }
  } catch (err) {
    // showAlert('error', err);
    console.log(err.response.data.message);
  }
};
