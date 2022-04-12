import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import useForm from "../../../hooks/useForm";
import { Input } from "../../Input";
import styles from "./styles.module.scss"

export function ModalEdit({ submit, id, name, type}) {
    const [show, setShow] = useState(false);
    const newName = useForm('name');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        newName.setValue(name);
    }, []);

    return (
        <>
            <button onClick={handleShow}><FaEdit /></button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton id={styles.modal_header}>
                    <span className={styles.title}>Editar</span>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        id={"name"}
                        type={"text"}
                        placeholder={"Digite um nome para esta opção"}
                        label={"Nome"}
                        {...newName}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className={styles.btn_prev} onClick={handleClose}>Voltar</button>
                    <button className={styles.btn_submit} onClick={() => {
                        submit(newName.value, id, type)
                        handleClose();
                    }}>Salvar</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}