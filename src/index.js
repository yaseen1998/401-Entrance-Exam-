import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-gl6o51yw.us.auth0.com"
    clientId="jksxioehJrbWwQobL6bVSYiZaSs3Y0RJ"
    redirectUri="http://localhost:3000/"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);