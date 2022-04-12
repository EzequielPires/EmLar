import { AlertDelete } from "../AlertDelete";
import { ModalEdit } from "../Modals/ModalEdit";
import { ModalCreate } from "../Modals/ModalCreate";
import { ModalTypeImmobileEdit } from "../ModalTypeImmobileEdit";
import styles from "./styles.module.scss";

export function TableOne({handleSubmit, handleEdit, handleDelete, type, title, list}) {
    return (
        <div className={styles.table_one}>
            <div className={styles.header + " d-flex justify-content-between align-items-start"}>
                <h4>{title}</h4>
                <ModalCreate submit={handleSubmit} type={type}/>
            </div>
            <div className={styles.table}>
                <div className={styles.row}>
                    <div className={styles.item}>
                        <span>Id</span>
                    </div>
                    <div className={styles.item}>
                        <span>Nome</span>
                    </div>
                    <div className={styles.item}>
                        <span>Ações</span>
                    </div>
                </div>
                {list.length > 0 ? list.map(item => (
                    <div className={styles.row}>
                        <div className={styles.item}>
                            <span>{item.id}</span>
                        </div>
                        <div className={styles.item}>
                            <span>{item.name}</span>
                        </div>
                        <div className={styles.item}>
                            <ModalEdit submit={handleEdit} id={item.id} name={item.name} type={type}/>
                            <AlertDelete submit={handleDelete} id={item.id} name={item.name} type={type}/>
                        </div>
                    </div>
                )) : null}
            </div>
        </div>
    )
}