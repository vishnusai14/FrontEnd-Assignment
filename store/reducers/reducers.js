const initialState = {
  email: "",
  uid: "",
  favNews: [],
  news: [],
  total: 0,
  view: "grid",
};

const reducer = (state = initialState, action) => {
  if (action.type === "LOGIN") {
    let email = action.email;
    let uid = action.uid;
    return {
      ...state,
      email: email,
      uid: uid,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      email: "",
      uid: "",
    };
  }
  if (action.type === "SETNEWS") {
    console.log("Seetting ");
    return {
      ...state,
      news: action.news,
    };
  }
  if (action.type === "TOTAL") {
    return {
      ...state,
      total: action.total,
    };
  }
  if (action.type === "CHANGEVIEW") {
    return {
      ...state,
      view: action.view,
    };
  }
  if (action.type === "SETFAVNEWS") {
    return {
      ...state,
      favNews: action.favNews,
    };
  }
  return state;
};

export default reducer;
