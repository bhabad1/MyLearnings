import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import  Home  from "./components/Home";
import "bulma/css/bulma.css";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
     
    </>
  );
}

export default App;
