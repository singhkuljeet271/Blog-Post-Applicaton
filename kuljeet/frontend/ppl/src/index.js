import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";

import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,

  document.getElementById("root")
);
registerServiceWorker();
