import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import styles from "./Home.module.css";
import useTransactions from "../../hooks/useTransactions";
import CardTransaction from "../../components/CardTransaction";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  const { userLoggedIn, currentUser } = useContext(AuthContext);
  const { last5Transactions, saldoTotal } = useTransactions();

  if (!userLoggedIn || !currentUser) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Sidebar />
        <div className={styles.transactions}>
          {last5Transactions.length ? (
            <p>Ultimas transações...</p>
          ) : (
            <p>Você não possui transações</p>
          )}

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
