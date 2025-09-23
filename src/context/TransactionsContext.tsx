import { createContext, useContext, useEffect, useState } from "react";
import ITransaction from "../interface/ITransaction";
import {
  collection,
  getDocs,
  addDoc,
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
  createTransaction: (data: FormData) => void;
}

const TransactionsContext = createContext<
  ITransactionsContextProps | undefined
>(undefined);
TransactionsContext.displayName = "TransactionsContext";

const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      getTransactions(currentUser.uid);
    } else {
      setTransactions([]);
    }
  }, [currentUser]);

  const getTransactions = async (userId: string) => {
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", userId)
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
  };

  const saldoTotal = transactions.reduce((acc, item) => {
    return acc + item.value;
  }, 0);

  const last5Transactions = transactions
    .slice(0, 5)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const createTransaction = async (data: FormData) => {
    if (!currentUser) return;

    const newTransaction: Omit<ITransaction, "id"> = {
      description: data.get("description") as string,
      value: Number(data.get("value")),
      category: data.get("category") as string,
      date: new Date(data.get("date") as string),
      paymentMethod: data.get("paymentMethod") as string,
      recurrent: Boolean(data.get("recurrent")),
      pay: Boolean(data.get("pay")),
      type: data.get("type") as "Despesa" | "Receita",
      userId: currentUser.uid,
    };

    try {
      const adjustedValue =
        newTransaction.type === "Despesa"
          ? -Math.abs(newTransaction.value)
          : Math.abs(newTransaction.value);

      await addDoc(collection(db, "transactions"), {
        ...newTransaction,
        value: adjustedValue,
        date: newTransaction.date,
      });

      await getTransactions(currentUser.uid);
    } catch (error) {
      console.error("Erro ao criar transação: ", error);
    }
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        saldoTotal,
        last5Transactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export { TransactionsContext, TransactionsProvider };
