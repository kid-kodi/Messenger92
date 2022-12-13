import { FetchWrapper } from "../helpers/FetchWrapper";
const API_URL = process.env.REACT_APP_BASE_API_URL;

const create = async (data) => {
  try {
    const response = await FetchWrapper.post(`${API_URL}/users`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchAll = async () => {
  try {
    const response = await FetchWrapper.get(`${API_URL}/users`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchSingle = async (id) => {
  try {
    const response = await FetchWrapper.get(`${API_URL}/users/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, data) => {
  try {
    const response = await FetchWrapper.put(`${API_URL}/users/${id}`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (id) => {
  try {
    const response = await FetchWrapper.remove(`${API_URL}/users/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const follow = async (id) => {
  try {
    const response = await FetchWrapper.put(`${API_URL}/users/follow`, {
      followId: id,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const unfollow = async (id) => {
  try {
    const response = await FetchWrapper.put(`${API_URL}/users/follow`, {
      unfollowId: id,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { create, fetchAll, fetchSingle, update, remove, follow, unfollow };
