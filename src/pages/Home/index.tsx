import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import styles from "./Home.module.css";
import useTransactions from "../../hooks/useTransactions";
import CardTransaction from "../../components/CardTransaction";
import Header from "../../components/Header";

const Home = () => {
  const { userLoggedIn, currentUser } = useContext(AuthContext);
  const photoUrl = currentUser?.photoURL
    ? currentUser.photoURL
    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

  const { last5Transactions, saldoTotal } = useTransactions();

  if (!userLoggedIn || !currentUser) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <aside>
          <img
            className={styles.photoImage}
            src={photoUrl}
            alt="Foto de perfil"
          />
          <p>
            {currentUser?.displayName
              ? currentUser.displayName
              : currentUser?.email}
          </p>
        </aside>
        <div className={styles.transactions}>
          <p>Ultimas transações...</p>

          <ul className={styles.lastTransactions}>
            {last5Transactions.map((transaction) => (
              <CardTransaction key={transaction.id} transaction={transaction} />
            ))}
          </ul>

          <p className={styles.saldo}>Saldo: R${saldoTotal}</p>
        </div>
      </main>
    </>
  );
};

export default Home;
