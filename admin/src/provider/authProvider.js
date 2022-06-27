import axios from "axios";

const authProvider = {
  login: (params) => {
    const [username, backendUrl] = params.username.split("@");
    return axios
      .post(`https://${backendUrl}/auth/login`, {
        name: username,
        password: params.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("backendUrl", backendUrl);
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      });
  },
  checkError: (error) => Promise.resolve(),
  // when the user navigates, make sure that their credentials are still valid
  checkAuth: (params) => {
    const backendUrl = localStorage.getItem("backendUrl");
    if (backendUrl) {
      return axios
        .post(`https://${backendUrl}/auth/verify`, {
          token: localStorage.getItem("jwt"),
        })
        .then((res) => {
          localStorage.setItem("role", res.data.role);
        });
    } else return Promise.reject();
  },
  // remove local credentials and notify the auth server that the user logged out
  logout: () => {
    localStorage.clear("jwt");
    return Promise.resolve();
  },
  // get the user's profile
  getIdentity: () => Promise.resolve(),
  // get the user permissions (optional)
  getPermissions: () => Promise.reject(),
};

export default authProvider;
