import { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import styles from "./NewTransaction.module.css";

const NewTransaction = () => {
  const { userLoggedIn, currentUser } = useContext(AuthContext);

  if (!userLoggedIn || !currentUser) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Sidebar />
        <div className={styles.newTransaction}>
          <h2>Nova transação</h2>

          <form>
            <div className={styles.formGroup}>
              <label htmlFor="description">Descrição: </label>
              <input type="text" id="description" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="value">Valor: </label>
              <input type="number" id="value" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="category">Categoria: </label>
              <select id="category" required>
                <option value="" disabled selected>
                  Selecione uma categoria
                </option>
                <option value="Alimentação">Alimentação</option>
                <option value="Lanche">Lanche</option>
                <option value="Serviços">Serviços</option>
                <option value="Salário">Salário</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="date">Data da transação: </label>
              <input type="date" id="date" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="paymentMethod">Método de pagamento: </label>
              <select id="paymentMethod" required>
                <option value="" disabled selected>
                  Selecione um método de pagamento
                </option>
                <option value="Pix">Pix</option>
                <option value="Débito em Conta">Débito em Conta</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Transferência Bancária">
                  Transferência Bancária
                </option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="recurrent">É recorrente? </label>
              <input type="checkbox" id="recurrent" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="pay">Já foi pago? </label>
              <input type="checkbox" id="pay" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="type">Tipo da transação: </label>
              <select id="type">
                <option value="" disabled selected>
                  Selecione o tipo da transação
                </option>
                <option value="Despesa">Despesa</option>
                <option value="Receita">Receita</option>
              </select>
            </div>
            <button type="submit">Criar transação</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default NewTransaction;
