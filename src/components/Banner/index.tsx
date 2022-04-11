import { FormFilter } from "../FormFilter";
import BannerImg from "../../assets/images/predio.jpg";
import styles from "./styles.module.scss";

export function Banner() {
    return (
        <div className={styles.body}>
            <div className="container d-flex">
                <div className={styles.content}>
                    <h1>Encontre o lugar perfeito para morar</h1>
                    <p>Alugue seu imóvel de forma simples e rápida com preços acessíveis e com uma ótima qualidade</p>
                    <FormFilter />
                </div>
                <div className={styles.content_image}>
                    <div className={styles.image}>
                        <img src={BannerImg.src} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}