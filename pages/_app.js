import "../styles/globals.css";

import { legacy_createStore as createStore } from "redux";
import reducer from "../store/reducers/reducers";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

const store = createStore(reducer);

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      {" "}
      <Component {...pageProps} />{" "}
    </Provider>
  );
};

export default MyApp;
