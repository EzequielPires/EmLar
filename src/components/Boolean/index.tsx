import styles from "./styles.module.scss";

export function Boolean({ title }) {
    return (
        <div className={styles.boolean}>
            <div className={styles.title}>
                <h4>{title}</h4>
            </div>
            <div className="d-flex mt-3">
                <button>Sim</button>
                <button>Não</button>
            </div>
        </div>
    )
}