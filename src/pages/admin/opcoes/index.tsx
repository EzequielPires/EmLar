import { useContext, useEffect, useState } from "react";
import { AsideBar } from "../../../components/AsideBar";
import { Navbar } from "../../../components/Navbar";
import { AlertContext } from "../../../contexts/AlertContext";
import { api } from "../../../services/api";
import styles from "./styles.module.scss";
import { TableOne } from "../../../components/TableOne";

export default function TiposImoveis() {
    const [listTypes, setListTypes] = useState([]);
    const [listMobile, setListMobile] = useState([]);
    const [listConcierge, setListConcierge] = useState([]);
    const [listTypeKey, setListTypeKey] = useState([]);
    const [listStateImmobile, setListStateImmobile] = useState([]);
    const [listImmovableRelationship, setListImmovableRelationship] = useState([]);
    
    const {alertShow} = useContext(AlertContext);
    const getTypesImmobiles = async () => {
        await api.get('/type-immobile/list').then(res => setListTypes(res.data.data));
        await api.get('/concierge/list').then(res => setListConcierge(res.data.data));
        await api.get('/key/list').then(res => setListTypeKey(res.data.data));
        await api.get('/furniture/list').then(res => setListMobile(res.data.data));
        await api.get('/state-immobile/list').then(res => setListStateImmobile(res.data.data));
        await api.get('/immovable-relationship/list').then(res => setListImmovableRelationship(res.data.data));
    }
    const handleSubmit = async (type, name) => {
        await api.post(`/${type}/new`, {
            name: name
        }).then((res: any) => {
            getTypesImmobiles();
            if(res.data.success) {
                alertShow("success", "Cadastrado com sucesso.");
            } else {
                alertShow("danger", "Erro ao cadastrar, tente novamente.");
            }
        })
    }
    const handleDelete = async (id, type) => {
        await api.delete(`/${type}/remove/${id}`).then((res: any) => {
            getTypesImmobiles();
            if(res.data.success) {
                alertShow("success", "Deletado com sucesso.");
            } else {
                alertShow("danger", "Erro ao deletar, tente novamente.");
            }
        })
    }
    const handleEdit = async (name, id, type) => {
        await api.put(`/${type}/edit/${id}`, {
            name: name
        }).then((res: any) => {
            getTypesImmobiles();
            if(res.data.success) {
                alertShow("success", "Editado com sucesso.");
            } else {
                alertShow("danger", "Erro ao editar, tente novamente.");
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
            <div className={styles.content + " d-flex flex-column gap-5"}>
                <TableOne 
                    handleSubmit={handleSubmit}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    title={"Tipos de imóveis"}
                    type={"type-immobile"}
                    list={listTypes}
                />
                <TableOne 
                    handleSubmit={handleSubmit}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    title={"Móveis"}
                    type={"furniture"}
                    list={listMobile}
                />
                <TableOne 
                    handleSubmit={handleSubmit}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    title={"Portaria"}
                    type={"concierge"}
                    list={listConcierge}
                />
                <TableOne 
                    handleSubmit={handleSubmit}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    title={"Tipo de chave"}
                    type={"key"}
                    list={listTypeKey}
                />
                <TableOne 
                    handleSubmit={handleSubmit}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    title={"Estado do imóvel"}
                    type={"state-immobile"}
                    list={listStateImmobile}
                />
                <TableOne 
                    handleSubmit={handleSubmit}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    title={"Relação com imóvel"}
                    type={"immovable-relationship"}
                    list={listImmovableRelationship}
                />
            </div>
        </div>
    )
}