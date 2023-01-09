import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const instance = axios.create({
  baseURL,
  timeout: 200000
});

export const useApi = {
    postVerify(params) {
      return instance.post('iam/no-auth/users/otp', params);
    },
}