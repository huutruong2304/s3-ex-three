import React from "react";
import "./App.css";
import LoginForm from "../login-form/LoginForm";
import NotFound from "../../components/404/NotFound";
function App() {
  return (
    <div className="App">
      {/* <NotFound></NotFound> */}
      <LoginForm></LoginForm>
    </div>
  );
}

export default App;
