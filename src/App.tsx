import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderLogin from "./components/HeaderLogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Extract from "./pages/Extract";
import NewTransaction from "./pages/NewTransaction";
import { useEffect } from "react";
import { app } from "./firebase/firebase";

const App = () => {
  useEffect(() => {
    console.log("Firebase App:", app);
    console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
  }, []);

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
