import { useContext, useEffect, useState } from "react";
import { AlertContext } from "../../contexts/AlertContext";
import styles from "./styles.module.scss";

export function Alert() {
    const {show, type, message} = useContext(AlertContext);
    if(type === "danger") {
        return (
            <div className={styles.alert + ` ${show && styles.visible} ${styles.danger}`}>
                <h4>Opps...</h4>
                <p>{message}</p>
            </div>
        )
    }
    return (
        <div className={styles.alert + ` ${show && styles.visible}`}>
            <h4>Sucesso</h4>
            <p>{message}</p>
        </div>
    )
}