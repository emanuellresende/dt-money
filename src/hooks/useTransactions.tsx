import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services";

interface Transaction {
  id: number;
  title: string;
  value: number;
  category: string;
  date: string;
  type: string;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionInputProps {
  title: string;
  value: number;
  category: string;
  type: string;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInputProps) => Promise<void>;
}
const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  const createTransaction = async (transactionInput: TransactionInputProps) => {
    const response = await api.post("/transactions", {
      ...transactionInput,
      date: new Date(),
    });
    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  };
  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  return context;
};
