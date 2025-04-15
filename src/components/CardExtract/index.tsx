import ITransaction from "../../interface/ITransaction";
import styles from "./CardExtract.module.css";

const CardExtract = ({ transaction }: { transaction: ITransaction }) => {
  const isIncome = transaction.type === "Receita";

  return (
    <li className={styles.cardItem}>
      <div className={styles.description}>
        {transaction.description}
        <span className={styles.category}>{transaction.category}</span>
      </div>
      <div className={styles.details}>
        <span>{transaction.date.toLocaleDateString()}</span>
        <span>{transaction.paymentMethod}</span>
        <span style={{ color: isIncome ? "green" : "red" }}>
          {transaction.value.toFixed(2)}
        </span>
      </div>
    </li>
  );
};

export default CardExtract;
