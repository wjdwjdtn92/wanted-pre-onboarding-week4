import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data }) => data);

type ReqeustType = {
  url: string;
  config?: AxiosRequestConfig;
  data?: any;
};

type ApiRequestType = {
  get: ({ url, config }: ReqeustType) => Promise<any>;
  delete: ({ url, config }: ReqeustType) => Promise<any>;
  post: ({ url, data, config }: ReqeustType) => Promise<any>;
};

const apiRequest: ApiRequestType = {
  get: ({ url, config }) => baseInstance.get(url, config),
  delete: ({ url, config }) => baseInstance.delete(url, config),
  post: ({ url, data, config }) => baseInstance.post(url, data, config),
};

export default apiRequest;
