import ITransaction from "../../interface/ITransaction";
import styles from "./CardTransaction.module.css";

const CardTransaction = ({ transaction }: { transaction: ITransaction }) => {
  const isIncome = transaction.type === "Receita";

  return (
    <li
      className={styles.cardItem}
      style={{
        backgroundColor: isIncome ? "#e0ffe0" : "#ffe0e0",
      }}
    >
      <strong>{transaction.description}</strong>
      <span>
        {isIncome ? "+" : "-"}R${Math.abs(transaction.value).toFixed(2)}
      </span>
      <span className={styles.tag}>{transaction.category}</span>
      <span>{transaction.date.toLocaleDateString()}</span>
      <span>{transaction.paymentMethod}</span>
    </li>
  );
};

export default CardTransaction;
