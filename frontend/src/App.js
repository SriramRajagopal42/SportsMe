import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login.js';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
