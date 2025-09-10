import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddTransaction from "./AddTransaction";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTransaction />} />
      </Routes>
    </Router>
  );
};

export default App;
