import styles from "./styles.module.scss";

export function Input({label, value, onChange, id, type, placeholder}) {
    return (
        <div className={styles.input_box}>
            <label htmlFor={id}>{label}</label>
            <input type={type} value={value} id={id} placeholder={placeholder} onChange={onChange} />
        </div>
    );
}