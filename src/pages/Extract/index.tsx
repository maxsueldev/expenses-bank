import Header from "../../components/Header";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useTransactions from "../../hooks/useTransactions";
import { Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import CardExtract from "../../components/CardExtract";
import styles from "./Extract.module.css";

const Extract = () => {
  const { userLoggedIn, currentUser } = useContext(AuthContext);
  const { transactions } = useTransactions();

  if (!userLoggedIn || !currentUser) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Sidebar />
        <section className={styles.extract}>
          {!transactions.length && (
            <p className={styles.withoutTransactions}>
              Você não possui transações
            </p>
          )}
          <ul>
            {transactions?.map((transaction) => (
              <CardExtract key={transaction.id} transaction={transaction} />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Extract;
