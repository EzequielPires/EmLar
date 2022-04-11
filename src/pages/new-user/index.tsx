import Link from "next/link";
import { Input } from "../../components/Input";
import styles from "./styles.module.scss";
import Logo from "../../assets/images/logo.svg";
import { Icon } from "../../components/Icon";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AlertContext } from "../../contexts/AlertContext";

export default function NewUser() {
    const {alertShow} = useContext(AlertContext);
    const {user, create} = useContext(UserContext);
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await create();
        if(!res) {
            alertShow("danger", "Falha na criação de usuário, tente novamente.");
        } else {
            alertShow("success", "Usuário criado com sucesso.");
        }
    }
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <header>
                    <Link href="/">
                        <a>
                            <img src={Logo.src} alt="logo" />
                        </a>
                    </Link>
                    <h4 className={styles.title}>Criar conta <span>.</span></h4>
                </header>
                <main className="mt-4">
                    <Input
                        {...user.name}
                        label={"Nome"}
                        id={"name"}
                        placeholder={"Entre com seu nome completo"}
                        type={"text"}
                    />
                    <div className="mt-4"></div>
                    <Input
                        {...user.phone}
                        label={"Telefone/Celular"}
                        id={"phone"}
                        placeholder={"Entre com o número do seu celular"}
                        type={"tell"}
                    />
                    <div className="mt-4"></div>
                    <Input
                        {...user.email}
                        label={"E-mail"}
                        id={"email"}
                        placeholder={"Entre com seu e-mail"}
                        type={"email"}
                    />
                    <div className="mt-4"></div>
                    <Input
                        {...user.password}
                        label={"Senha"}
                        id={"password"}
                        placeholder={"Entre com sua senha"}
                        type={"password"}
                    />
                    <div className="mt-4"></div>
                    <Input
                        value={password}
                        onChange={setPassword}
                        label={"Repita a senha"}
                        id={"password-repeat"}
                        placeholder={"Entre com sua senha"}
                        type={"password"}
                    />

                    <div className="d-flex w-100 flex-column align-items-center">
                        <button className={styles.btn_submit}>Criar</button>
                        <Link href={"/login"}>
                            <a className={styles.signup}>Já tem uma conta? <span>SingIn</span></a>
                        </Link>
                    </div>
                </main>
            </form>
        </div>
    )
}