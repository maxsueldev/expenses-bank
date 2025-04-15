import { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import styles from "./NewTransaction.module.css";

const NewTransaction = () => {
  const { userLoggedIn, currentUser } = useContext(AuthContext);

  if (!userLoggedIn || !currentUser) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Sidebar />
        <div>
          <h2>Nova transação</h2>
        </div>
      </main>
    </>
  );
};

export default NewTransaction;
