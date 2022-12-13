import axios from "axios";

function authToken() {
  let auth = JSON.parse(localStorage.getItem("user"));
  return auth?.token;
}

function authHeader() {
  // return auth header with jwt if user is logged in and request is to the api url
  const token = authToken();
  const isLoggedIn = !!token;
  return {
    headers: {
      Authorization: isLoggedIn ? `Bearer ${token}` : "",
    },
  };
}

const postRequest = async (url, payload = {}, options = {}) => {
  return axios
    .post(url, payload, { ...authHeader(), ...options })
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
};

const putRequest = async (url, payload = {}, options = {}) => {
  return axios
    .put(url, payload, { ...authHeader(), ...options })
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
};

const getRequest = async (url, options = {}) => {
  return axios
    .get(url, { ...authHeader(), ...options })
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
};

const removeRequest = async (url, payload = {}, options = {}) => {
  return axios
    .delete(url, payload, { ...authHeader(), ...options })
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
};

export const FetchWrapper = {
  post: postRequest,
  put: putRequest,
  remove: removeRequest,
  get: getRequest,
};
