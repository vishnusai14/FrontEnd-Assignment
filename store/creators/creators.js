export const login = (email, uid) => {
  return {
    type: "LOGIN",
    email,
    uid,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const setNews = (news) => {
  return {
    type: "SETNEWS",
    news,
  };
};

export const total = (total) => {
  return {
    type: "TOTAL",
    total,
  };
};

export const changeView = (view) => {
  return {
    type: "CHANGEVIEW",
    view,
  };
};

export const setFavNews = (favNews) => {
  return {
    type: "SETFAVNEWS",
    favNews,
  };
};
