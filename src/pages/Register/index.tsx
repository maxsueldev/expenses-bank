import styles from "./Register.module.css";
import { onCreateUser } from "../../firebase/auth";
import { FormEvent, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { userLoggedIn } = useContext(AuthContext);

  const onRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      onCreateUser(email, password);
      return <Navigate to={"/"} />;
    } catch (err) {
      setErrorMessage(`Erro ao cadastrar novo usuário: ${err}`);
    }
  };

  return (
    <main>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <div className={styles.container}>
        <h2 className={styles.presentation}>Crie uma conta na Expenses Bank</h2>
        <form onSubmit={onRegister}>
          <div className={styles.formControl}>
            <label htmlFor="email">Insira seu email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password">Insira uma senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
        <p className="errorMessage">{errorMessage}</p>
      </div>
    </main>
  );
};

export default Register;
