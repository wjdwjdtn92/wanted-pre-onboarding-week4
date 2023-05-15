import { API_ERROR_MESSAGE } from '../constants/message';
import apiRequest from './index';

const RESOURCE = '/todos';

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get({ url: `${RESOURCE}` });

    return response.data;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGE.GET_TODO);
  }
};

export const createTodo = async (title: string) => {
  try {
    const response = await apiRequest.post({
      url: `${RESOURCE}`,
      data: {
        title,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGE.CREATE_TODO);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await apiRequest.delete({ url: `${RESOURCE}/${id}` });

    return response.data;
  } catch (error) {
    throw new Error(API_ERROR_MESSAGE.DELETE_TODO);
  }
};
