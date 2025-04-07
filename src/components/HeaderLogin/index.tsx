import { Link, Outlet } from "react-router-dom";
import styles from "./HeaderLogin.module.css";

const HeaderLogin = () => {
  return (
    <>
      <header className={styles.header}>
        <Link to={"/"}>Login</Link>
        <Link to={"/register"}>Cadastrar</Link>
      </header>
      <Outlet />
    </>
  );
};

export default HeaderLogin;
