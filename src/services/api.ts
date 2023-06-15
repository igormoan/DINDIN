import axios from 'axios';

const api = axios.create({
  baseURL: 'https://desafio-backend-03-dindin.pedagogico.cubos.academy',
});

api.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@user_token');

      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export { api };