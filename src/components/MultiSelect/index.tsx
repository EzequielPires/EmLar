import styles from "./styles.module.scss";

type MultiSelectType = {
    title: string,
    options: Array<any>,
    value?: number | string | null | boolean,
    onChange?: (v:any) => void
}

export function MultiSelect({title, options, value, onChange}: MultiSelectType) {
    return (
        <div className={styles.multi_select}>
            <div className={styles.title}>
                <h4>{title}</h4>
            </div>
            <div className="d-flex mt-3">
                {options.map(item => (
                    <button className={value === item.id ? styles.active : null} onClick={() => onChange(item.id)} key={item.id}>{item.name}</button>
                ))}
            </div>
            
        </div>
    )
}