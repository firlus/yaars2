import axios from "axios";

const authProvider = {
  login: (params) =>
    axios
      .post(`http://${process.env.REACT_APP_HOSTNAME}:5000/auth/login`, {
        name: params.username,
        password: params.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("jwt", res.data.token);
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      }),
  checkError: (error) => Promise.resolve(),
  // when the user navigates, make sure that their credentials are still valid
  checkAuth: (params) =>
    axios
      .post(`http://${process.env.REACT_APP_HOSTNAME}:5000/auth/verify`, {
        token: localStorage.getItem("jwt"),
      })
      .then((res) => {
        localStorage.setItem("role", res.data.role);
      }),
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
