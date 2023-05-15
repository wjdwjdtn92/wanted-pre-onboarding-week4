import apiRequest from './index';

const RESOURCE = '/todos';

export const getTodoList = async () => {
  try {
    const response = await apiRequest.get({ url: `${RESOURCE}` });

    return response;
  } catch (error) {
    throw new Error('API getTodoList error');
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

    return response;
  } catch (error) {
    throw new Error('API createTodo error');
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const response = await apiRequest.delete({ url: `${RESOURCE}/${id}` });

    return response;
  } catch (error) {
    throw new Error('API deleteTodo error');
  }
};
