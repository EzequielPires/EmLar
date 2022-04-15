import styles from "./styles.module.scss";

export function MultiSelect({title, options}) {
    return (
        <div className={styles.multi_select}>
            <div className={styles.title}>
                <h4>{title}</h4>
            </div>
            <div className="d-flex mt-3">
                {options.map(item => (
                    <button>{item.name}</button>
                ))}
            </div>
        </div>
    )
}