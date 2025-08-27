export const authenicate = (response) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("token", JSON.stringify(response.data.token));
    sessionStorage.setItem("user", JSON.stringify(response.data.username));
  }
//   next();
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return null;
    }
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    if (sessionStorage.getItem("user")) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return null;
    }
  }
};

export const logout = (next) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
};
