interface ITransaction {
  id: number;
  description: string;
  value: number;
  category: string;
  date: Date;
  paymentMethod: string;
  recurrent: boolean;
  pay: boolean;
  type: string;
}

export default ITransaction;
