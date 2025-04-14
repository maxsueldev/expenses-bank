import { NavLink, Outlet } from "react-router-dom";
import { onSignOut } from "../../firebase/auth";
import styles from "./Header.module.css";

const Header = () => {
  const onLogout = () => {
    onSignOut();
  };

  return (
    <>
      <header className={styles.header}>
        <nav>
          <NavLink
            to={"/home"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Início
          </NavLink>
          <NavLink
            to={"/extract"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Extrato
          </NavLink>
          <NavLink
            to={"/newTransaction"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Nova Transação
          </NavLink>
          <NavLink to={"/"} className={styles.logout} onClick={onLogout}>
            Sair
          </NavLink>
        </nav>
      </header>

      <Outlet />
    </>
  );
};

export default Header;
