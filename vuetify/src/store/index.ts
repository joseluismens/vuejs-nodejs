import Vuex from 'vuex';



export default new Vuex.Store({
  state: {
    logged: localStorage.getItem('token') !=null ? true :false,
    token: localStorage.getItem('token')
},
getters: {
  // could use only this getter and use it for both token and logged
  // or could have both getters separated
  logged: state => state.logged,
  token: state => state.token
},
mutations: {
    login: (state, response) => {
        state.logged = true;
        state.token = response.token;
        console.log('state updated');
        console.log('state.logged flag is: '+state.logged);
        console.log('state.token: '+state.token);
    },
    logout: (state) => {
        state.logged = false;
        state.token = '';
    }
}
});