import Link from "next/link";
import { Icon } from "../Icon";
import Logo from "../../assets/images/logo-white.svg";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

export function AsideBar() {
    const router = useRouter();
    return (
        <nav className={styles.aside_bar}>
            <div className={styles.header}>
                <Link href={"/"}>
                    <img src={Logo.src} alt="" />
                </Link>
            </div>
            <ul>
                <li className={router.asPath === "/admin" ? styles.active : null}>
                    <Link href="/admin">
                        <a><Icon name={"home"} size={24} color={"#fff"} />Dashboard</a>
                    </Link>
                </li>
                <li className={router.asPath === "/admin/profile" ? styles.active : null}>
                    <Link href="/">
                        <a><Icon name={"user"} size={24} color={"#fff"} />User profiles</a>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <a><Icon name={"setting"} size={24} color={"#fff"} />Settings</a>
                    </Link>
                </li>
            </ul>
            <ul>
                <li className={router.asPath === "/admin/imoveis" ? styles.active : null}>
                    <Link href="/admin/imoveis">
                        <a>Imóveis</a>
                    </Link>
                </li>
                <li className={router.asPath === "/admin/opcoes" ? styles.active : null}>
                    <Link href="/admin/opcoes">
                        <a>Opções</a>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}