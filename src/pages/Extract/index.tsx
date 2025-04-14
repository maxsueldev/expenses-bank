import Header from "../../components/Header";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const Extract = () => {
  const { userLoggedIn, currentUser } = useContext(AuthContext);

  if (!userLoggedIn || !currentUser) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <Header />
    </>
  );
};

export default Extract;
