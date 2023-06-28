import jwt_decode from "jwt-decode";



class TokenService {
    getLocalRefreshToken() {
      const user = localStorage.getItem("token");
      return user;
    }
  
    getLocalAccessToken() {
      const user = localStorage.getItem("token");
      return user;
    }
  
    updateLocalAccessToken(token:string) {
      let user = localStorage.getItem("token");
      user = token;
      localStorage.setItem("token", user);
    }
  
    getUser() {
      return localStorage.getItem("token");
    }
    loggedIn(): boolean {
        return !!localStorage.getItem('token');
      }
    setUser(user:string) {
      console.log(JSON.stringify(user));
      localStorage.setItem("token", user);
    }
  
    removeUser() {
      localStorage.clear();
    }

    isAdmin(){
        const token  = localStorage.getItem('token');
        if (token != null) {
            const decoded:any = jwt_decode(token);
           
            const roles= decoded.roles.filter((el:any)=>el.id ==2); 
            if (roles.length>0) {
                    return true;
            }
            return false;
        }
        return false;
    }
  }
  
  export default new TokenService();