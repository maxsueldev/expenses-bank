import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { onSignOut } from "../../firebase/auth";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { userLoggedIn } = useContext(AuthContext);

  if (!userLoggedIn) {
    return <Navigate to={"/"} replace={true} />;
  }

  const onLoggout = () => {
    onSignOut();
  };

  return <button onClick={onLoggout}>Sair</button>;
};

export default Home;
