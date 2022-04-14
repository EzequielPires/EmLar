import { FaMinus, FaPlus } from "react-icons/fa";
import styles from "./styles.module.scss";

export function Increment({title, subtitle, min, max, value, onChange}) {
    const inc = () => {
        value < max ? onChange(value+1) : null;
    }
    const denc = () => {
        value > min ? onChange(value-1) : null;
    }
    return (
        <div className={styles.increment}>
            <div className={styles.title}>
                <h4>{title}</h4>
                <p>{subtitle}</p>
            </div>
            <div className={styles.value}>
                <button onClick={denc}><FaMinus /></button>
                <p>{value}</p>
                <button onClick={inc}><FaPlus /></button>
            </div>
        </div>
    )
}