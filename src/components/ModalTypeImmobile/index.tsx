import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import useForm from "../../hooks/useForm";
import { api } from "../../services/api";
import { Input } from "../Input";
import styles from "./styles.module.scss"

export function ModalTypeImmobile({ submit }) {
    const [show, setShow] = useState(false);
    const name = useForm('name');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        name.setValue('');
    }, [show]);


    return (
        <>
            <button onClick={handleShow}>Cadastrar tipo</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton id={styles.modal_header}>
                    <span className={styles.title}>Cadastrar</span>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        id={"name"}
                        type={"text"}
                        placeholder={"Digite um nome para o tipo"}
                        label={"Nome"}
                        {...name}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button className={styles.btn_prev} onClick={handleClose}>Voltar</button>
                    <button className={styles.btn_submit} onClick={() => {
                        submit(name.value)
                        handleClose();
                    }}>Salvar</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}