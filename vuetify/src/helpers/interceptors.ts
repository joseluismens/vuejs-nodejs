import axios from 'axios';
import store from '../store';
import router from '../router';

const instance = axios.create({
  baseURL: 'http://localhost:3010/api/',
  // ...otras configuraciones si es necesario
});

instance.interceptors.request.use(function(config) {
  const token = store.getters.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function(err) {
  return Promise.reject(err);
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // Si la respuesta es 401 Unauthorized, el token ha expirado o es inválido
    if (error.response && error.response.status === 401) {
      // Realizar acciones para actualizar el token, por ejemplo, llamar a una acción en Vuex
      store.dispatch('refreshToken')
        .then(() => {
          // Después de actualizar el token, repetir la petición original
          const config = error.config;
          config.headers.Authorization = `Bearer ${store.state.token}`;

          return new Promise((resolve, reject) => {
            axios.request(config)
              .then(response => {
                resolve(response);
              })
              .catch(error => {
                reject(error);
              });
          });
        })
        .catch(() => {
          // Si no se pudo actualizar el token, redirigir al usuario al inicio de sesión o mostrar un mensaje de error
          router.push('/login');
        });
    }

    return Promise.reject(error);
  }
);

export default instance;
