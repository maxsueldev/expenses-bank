interface ITransaction {
  id?: string;
  description: string;
  value: number;
  category: string;
  date: Date;
  paymentMethod: string;
  recurrent: boolean;
  pay: boolean;
  type: "Despesa" | "Receita";
  userId: string;
}

export default ITransaction;
