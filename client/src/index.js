import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./index.css";

// set up
import "fontsource-roboto";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme/theme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  likesReducer,
  commentsReducer,
  articlesReducer,
  usersReducer,
  searchReducer,
} from "./store/reducers";

const rootReducer = combineReducers({
  articles: articlesReducer,
  users: usersReducer,
  comments: commentsReducer,
  likes: likesReducer,
  search: searchReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
