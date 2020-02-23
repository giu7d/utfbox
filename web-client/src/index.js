import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { Provider as MobxProvider } from "mobx-react";
import AppStore from "./stores/AppStore";

function App() {
  return (
    <MobxProvider AppStore={AppStore}>
      <Routes />
    </MobxProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
