import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderLogin from "./components/HeaderLogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Extract from "./pages/Extract";
import NewTransaction from "./pages/NewTransaction";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderLogin />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/home" element={<Home />} />
        <Route path="/extract" element={<Extract />} />
        <Route path="/newTransaction" element={<NewTransaction />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
