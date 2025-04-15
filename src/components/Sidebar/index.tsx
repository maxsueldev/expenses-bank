import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);

  const photoUrl = currentUser?.photoURL
    ? currentUser.photoURL
    : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

  return (
    <aside>
      <img className={styles.photoImage} src={photoUrl} alt="Foto de perfil" />
      <p>
        {currentUser?.displayName
          ? currentUser.displayName
          : currentUser?.email}
      </p>
    </aside>
  );
};

export default Sidebar;
