import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeIcon from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";

import { Container, RadioButton, TransactionTypeContainer } from "./styles";

Modal.setAppElement("#root");

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault();
    await createTransaction({
      title,
      value,
      category,
      type,
    });
    setTitle("");
    setValue(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeIcon} alt="Modal Close" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Create New transaction</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioButton
            type="button"
            title="Income"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="income"
          >
            <img alt="Income" src={incomeImg} />
            <span>Income</span>
          </RadioButton>
          <RadioButton
            type="button"
            title="Outcome"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="outcome"
          >
            <img alt="Outcome" src={outcomeImg} />
            <span>Outcome</span>
          </RadioButton>
        </TransactionTypeContainer>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">Register</button>
      </Container>
    </Modal>
  );
};
