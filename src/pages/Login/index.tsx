import { FormEvent, useState } from "react";
import { onSignIn, onSignInWithGoogle } from "../../firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import styles from "./Login.module.css";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { userLoggedIn, loading } = useContext(AuthContext);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
    }

    try {
      await onSignIn(email, password);
    } catch (err) {
      setErrorMessage(`Erro ao tentar acessar o sistema: ${err}`);
      setIsSigningIn(false);
    }
  };

  const onGoogleSignIn = () => {
    if (!isSigningIn) {
      setIsSigningIn(true);
      onSignInWithGoogle().catch((err) => {
        setErrorMessage(`Erro ao tentar acessar o sistema: ${err}`);
        setIsSigningIn(false);
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <main className={styles.main}>
        <div className={styles.loginForm}>
          <div>
            <h3 className={styles.presentation}>Seja bem-vindo!</h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className={styles.formControl}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={isSigningIn}>
              {isSigningIn ? "Entrando..." : "Entrar"}
            </button>

            <p className={styles.toRegister}>
              Não tem uma conta?
              <Link to={"/register"} className={styles.register}>
                Cadastrar
              </Link>
            </p>

            <button
              className={styles.continueWithGoogle}
              onClick={onGoogleSignIn}
              disabled={isSigningIn}
            >
              <FaGoogle />
              Continue com Google
            </button>
          </form>
          <p className="errorMessage">{errorMessage}</p>
        </div>
      </main>
    </div>
  );
};

export default Login;
