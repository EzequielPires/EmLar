import { useContext, useEffect, useState } from "react";
import { AsideBar } from "../../../components/AsideBar";
import { ModalTypeImmobile } from "../../../components/ModalTypeImmobile";
import { Navbar } from "../../../components/Navbar";
import { AlertContext } from "../../../contexts/AlertContext";
import { api } from "../../../services/api";
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import styles from "./styles.module.scss";
import { AlertDelete } from "../../../components/AlertDelete";
import { ModalTypeImmobileEdit } from "../../../components/ModalTypeImmobileEdit";

export default function TiposImoveis() {
    const [listTypes, setListTypes] = useState([]);
    const {alertShow} = useContext(AlertContext);
    const getTypesImmobiles = async () => {
        //const res: any = await api.get('/type-immobile/list').then(res => res.data);
        //console.log(res.data);
        //setListTypes(res.data);
    }
    const handleSubmit = async (name) => {
        await api.post('/type-immobile/new', {
            name: name
        }).then((res: any) => {
            getTypesImmobiles();
            if(res.data.success) {
                alertShow("success", "Tipo de imóvel criado com sucesso.");
            } else {
                alertShow("danger", "Erro ao cadastrar tipo de imóvel, tente novamente.");
            }
        })
    }
    const handleDelete = async (id) => {
        await api.delete(`/type-immobile/remove/${id}`).then((res: any) => {
            getTypesImmobiles();
            if(res.data.success) {
                alertShow("success", "Tipo de imóvel deletado com sucesso.");
            } else {
                alertShow("danger", "Erro ao deletar tipo de imóvel, tente novamente.");
            }
        })
    }
    const handleEdit = async (name, id) => {
        await api.put(`/type-immobile/edit/${id}`, {
            name: name
        }).then((res: any) => {
            getTypesImmobiles();
            if(res.data.success) {
                alertShow("success", "Tipo de imóvel editado com sucesso.");
            } else {
                alertShow("danger", "Erro ao editar tipo de imóvel, tente novamente.");
            }
        })
    }


    useEffect(() => {
        getTypesImmobiles();
    }, []);
    return (
        <div className={styles.imoveis}>
            <Navbar />
            <AsideBar />
            <div className={styles.content}>
                <div className={styles.header + " d-flex justify-content-between align-items-center"}>
                    <h4>Tipos de imóveis</h4>
                    <ModalTypeImmobile submit={handleSubmit}/>
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
                    {listTypes.length > 0 ? listTypes.map(item => (
                        <div className={styles.row}>
                            <div className={styles.item}>
                                <span>{item.id}</span>
                            </div>
                            <div className={styles.item}>
                                <span>{item.name}</span>
                            </div>
                            <div className={styles.item}>
                                <ModalTypeImmobileEdit submit={handleEdit} id={item.id} name={item.name}/>
                                <AlertDelete submit={handleDelete} id={item.id} name={item.name}/>
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>
        </div>
    )
}