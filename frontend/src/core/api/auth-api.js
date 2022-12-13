import { FetchWrapper } from "../helpers/FetchWrapper";
export const API_URL = process.env.REACT_APP_BASE_API_URL;

const register = async (user_map) => {
  try {
    const response = await FetchWrapper.post(
      `${API_URL}/auth/register`,
      user_map
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const login = async (user_map) => {
  try {
    const response = await FetchWrapper.post(`${API_URL}/auth/login`, user_map);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  try {
    const response = await FetchWrapper.post(`${API_URL}/auth/logout`, {});
    return response;
  } catch (error) {
    console.log(error);
  }
};

const requestResetPassword = async (user_map) => {
  try {
    const response = await FetchWrapper.post(
      `${API_URL}/auth/forgot-password`,
      user_map
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (user_map, token) => {
  try {
    const response = await FetchWrapper.post(`${API_URL}/auth/reset-password`, {
      password: user_map.password,
      token,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { register, login, logout, requestResetPassword, resetPassword };
