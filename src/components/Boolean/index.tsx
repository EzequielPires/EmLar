import styles from "./styles.module.scss";

export function Boolean({ title, value, onChange }) {
    return (
        <div className={styles.boolean}>
            <div className={styles.title}>
                <h4>{title}</h4>
            </div>
            <div className="d-flex mt-3">
                <button className={value === true ? styles.active : null} onClick={() => onChange(true)}>Sim</button>
                <button className={value === false ? styles.active : null} onClick={() => onChange(false)}>Não</button>
            </div>
        </div>
    )
}