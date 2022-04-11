import { AsideBar } from "../../../components/AsideBar";
import { Navbar } from "../../../components/Navbar";
import styles from "./styles.module.scss";

export default function Imoveis() {
    return (
        <div className={styles.imoveis}>
            <Navbar />
            <AsideBar />
        </div>
    )
}