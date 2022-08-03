import { createServer, Model } from "miragejs";
import { useState } from "react";

import { Dashboard } from "./components/DashBoard";
import { Header } from "./components/Header";
import { GlobalStyles } from "./GlobalStyles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

createServer({
  models: {
    transaction: Model,
  },

  seeds: (server) => {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Buy Pc",
          value: -5000,
          category: "Buy",
          date: "12/12/2020",
          type: "withdraw",
        },
        {
          id: 2,
          title: "Develop Web",
          value: 15000,
          category: "Web",
          date: "12/12/2020",
          type: "deposit",
        },
      ],
    });
  },
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => this.schema.all("transaction"));

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transaction", data);
    });
  },
});

export function App() {
  const [isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] =
    useState(false);

  const handleNewTransactionsModalOpen = () => {
    setIsNewTransactionsModalOpen(true);
  };

  const handleNewTransactionsModalClose = () => {
    setIsNewTransactionsModalOpen(false);
  };

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleNewTransactionsModalOpen} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionsModalOpen}
        onRequestClose={handleNewTransactionsModalClose}
      />
      <GlobalStyles />
    </TransactionsProvider>
  );
}
