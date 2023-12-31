import axios from 'axios';

const API_URL = 'http://localhost:3010/api/';

class AuthService {
  login(user:any) {
    return axios
      .post(API_URL + 'login', {
        email: user.username,
        password: user.password
      })
      .then(response => {
        
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

 
}

export default new AuthService();