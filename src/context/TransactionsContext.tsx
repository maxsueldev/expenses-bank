import { createContext, useState } from "react";
import ITransaction from "../interface/ITransaction";

interface ITransactionsContextProps {
  transactions: ITransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
  saldoTotal: number;
  last5Transactions: ITransaction[];
}

const initialState = [
  {
    id: 0,
    description: "Salário - Abril",
    value: 2400.0,
    category: "Salário",
    date: new Date("2025-04-01"),
    paymentMethod: "Transferência Bancária",
    recurrent: true,
    pay: true,
    type: "Receita",
  },
  {
    id: 1,
    description: "Supermercado",
    value: -250.0,
    category: "Alimentação",
    date: new Date("2025-04-10"),
    paymentMethod: "Cartão de Crédito",
    recurrent: false,
    pay: true,
    type: "Despesa",
  },
  {
    id: 2,
    description: "Internet",
    value: -100.0,
    category: "Serviços",
    date: new Date("2025-04-05"),
    paymentMethod: "Débito em conta",
    recurrent: true,
    pay: false,
    type: "Despesa",
  },
  {
    id: 3,
    description: "Lava-Jato",
    value: -80.0,
    category: "Serviços",
    date: new Date("2025-03-06"),
    paymentMethod: "Pix",
    recurrent: false,
    pay: true,
    type: "Despesa",
  },
  {
    id: 4,
    description: "Açaí",
    value: -18.0,
    category: "Lanche",
    date: new Date("2025-04-02"),
    paymentMethod: "Pix",
    recurrent: false,
    pay: true,
    type: "Despesa",
  },
];

const TransactionsContext = createContext<
  ITransactionsContextProps | undefined
>(undefined);
TransactionsContext.displayName = "TransactionsContext";

const TransactionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] =
    useState<ITransaction[]>(initialState);

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
