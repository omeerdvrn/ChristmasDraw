import React from "react";
import DrawSetup from "./components/drawSetup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ResultSetup from "./components/resultSetup";

function App() {
  
  return (
  <Router>
    <div className="container">
      
      <h1>Happy New Year!</h1>
      
      <Routes>
        <Route exact path="/" element={<DrawSetup/>}></Route>   
        <Route path={":drawID"} element={<ResultSetup/>}/>
      </Routes>   
    </div>
  </Router>);
}

export default App;
