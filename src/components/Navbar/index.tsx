import Avatar from "../../assets/avatar.jpeg";
import { Icon } from "../Icon";
import styles from "./styles.module.scss";

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <p>Hello, Ezequiel</p>
            <div className="d-flex align-items-center gap-3">
                <Icon name={"search"} color={"#fff"} size={24} />
                <Icon name={"notification"} color={"#fff"} size={24} />
                <button className={styles.dropdown_toggle}>
                    <div className={styles.avatar}>
                        <img src={Avatar.src} alt="" />
                    </div>
                    Ezequiel Pires
                    <div className="mt-1">
                        <Icon name={"arrow-down"} color="#333" size={16} />
                    </div>
                </button>
            </div>
        </nav>
    )
}