import { createContext, useContext, useEffect, useState } from "react";
import ITransaction from "../interface/ITransaction";
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  DocumentData,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AuthContext } from "./AuthContext";

interface ITransactionsContextProps {
  transactions: ITransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
  saldoTotal: number;
  last5Transactions: ITransaction[];
}

const TransactionsContext = createContext<
  ITransactionsContextProps | undefined
>(undefined);
TransactionsContext.displayName = "TransactionsContext";

const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getTransactions = async () => {
      if (currentUser) {
        const q = query(
          collection(db, "transactions"),
          where("userId", "==", currentUser.uid)
        );

        const querySnapshot = await getDocs(q);

        type FirestoreTransaction = Omit<ITransaction, "id" | "date"> & {
          date: Timestamp | string | Date;
        };

        function parseTransaction(
          doc: QueryDocumentSnapshot<DocumentData>
        ): ITransaction {
          const data = doc.data() as FirestoreTransaction;

          return {
            id: doc.id,
            ...data,
            date:
              data.date instanceof Timestamp
                ? data.date.toDate()
                : data.date instanceof Date
                ? data.date
                : new Date(data.date),
          };
        }

        const myTransactions = querySnapshot.docs.map(parseTransaction);

        const sortedTransactions = myTransactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setTransactions(sortedTransactions);
      } else {
        setTransactions([]);
      }
    };

    getTransactions();
  }, [currentUser]);

  const saldoTotal = transactions.reduce((acc, item) => {
    return acc + item.value;
  }, 0);

  const last5Transactions = transactions
    .slice(-5)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <TransactionsContext.Provider
      value={{ transactions, setTransactions, saldoTotal, last5Transactions }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsContext, TransactionsProvider };
