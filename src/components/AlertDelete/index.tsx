import styles from "./styles.module.scss";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

export function AlertDelete({submit, name, id}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button onClick={handleShow}><FaTrashAlt /></button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton id={styles.modal_header}>
                    <span className={styles.title}>Deletar</span>
                </Modal.Header>
                <Modal.Body>
                    <p>Deseja mesmo deletar {name}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className={styles.btn_prev} onClick={handleClose}>Voltar</button>
                    <button className={styles.btn_submit} onClick={() => {
                        submit(id);
                        handleClose();
                    }}>Confirmar</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}