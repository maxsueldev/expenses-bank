import { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const NewTransaction = () => {
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

export default NewTransaction;
