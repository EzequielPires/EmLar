import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import Logo from "../../assets/images/logo.svg";
import { Icon } from "../../components/Icon";
import { Input } from "../../components/Input";
import styles from "./styles.module.scss";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSign = (e) => {
        e.preventDefault();
        router.push('/admin');
    }
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSign}>
                <header>
                    <Link href="/">
                        <a>
                            <img src={Logo.src} alt="logo" />
                        </a>
                    </Link>
                    <h4 className={styles.title}>Login <span>.</span></h4>
                </header>
                <main className="mt-4">
                    <Input
                        value={email}
                        onChange={setEmail}
                        label={"E-mail"}
                        id={"email"}
                        placeholder={"Entre com seu e-mail"}
                        type={"text"}
                    />
                    <div className="mt-4"></div>
                    <Input
                        value={password}
                        onChange={setPassword}
                        label={"Senha"}
                        id={"password"}
                        placeholder={"Entre com sua senha"}
                        type={"password"}
                    />
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className={styles.checkbox + " d-flex align-items-center gap-2"}>
                            <input type="checkbox" name="" id="" />
                            <label htmlFor="">Mantenha-me conectado</label>
                        </div>
                        <Link href={"/new-user"}>
                            <a className={styles.signup + " mt-0"}><span>Esqueceu a senha?</span></a>
                        </Link>
                    </div>
                    <div className="d-flex w-100 flex-column align-items-center">
                        <button className={styles.btn_submit}>Entrar</button>
                        <span className="d-block my-4">ou</span>
                        <div className="d-flex w-100 gap-3">
                            <button className={styles.btn}>
                                <Icon name={"google"} color={"var(--main)"} size={24} />
                                Google
                            </button>
                            <button className={styles.btn}>
                                <Icon name={"facebook-f"} color={"var(--main)"} size={24} />
                                Facebook
                            </button>
                        </div>
                        <Link href={"/new-user"}>
                            <a className={styles.signup}>Não tem uma conta? <span>SingUp</span></a>
                        </Link>
                    </div>
                </main>
            </form>
        </div>
    );
}