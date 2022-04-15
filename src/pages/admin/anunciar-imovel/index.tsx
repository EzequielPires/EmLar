import { useEffect, useState } from "react";
import { AsideBar } from "../../../components/AsideBar";
import { Boolean } from "../../../components/Boolean";
import { Increment } from "../../../components/Increment";
import { Input } from "../../../components/Input";
import { MultiSelect } from "../../../components/MultiSelect";
import { Navbar } from "../../../components/Navbar";
import useForm from "../../../hooks/useForm";
import { useIncrement } from "../../../hooks/useIncrement";
import { api } from "../../../services/api";
import styles from "./styles.module.scss";

export default function AnunciarImovel() {
    const numberRooms = useIncrement(1);
    const numberSuites = useIncrement(0);
    const numberBathrooms = useIncrement(1);
    const numberGarages = useIncrement(0);
    const area = useForm('area');
    const [listTypes, setListTypes] = useState([]);
    const [listMobile, setListMobile] = useState([]);
    const [listConcierge, setListConcierge] = useState([]);
    const [listTypeKey, setListTypeKey] = useState([]);
    const [listStateImmobile, setListStateImmobile] = useState([]);
    const [listImmovableRelationship, setListImmovableRelationship] = useState([]);
    const getTypesImmobiles = async () => {
       // await api.get('/type-immobile/list').then(res => setListTypes(res.data.data));
        await api.get('/concierge/list').then(res => setListConcierge(res.data.data));
        await api.get('/key/list').then(res => setListTypeKey(res.data.data));
        await api.get('/furniture/list').then(res => setListMobile(res.data.data));
        await api.get('/state-immobile/list').then(res => setListStateImmobile(res.data.data));
        await api.get('/immovable-relationship/list').then(res => setListImmovableRelationship(res.data.data));
    }
    useEffect(() => {
        getTypesImmobiles();
    }, []);
    return (
        <div className={styles.container}>
            <Navbar />
            <AsideBar />
            <div className={styles.content}>
                <h2>Cadastrar imóvel</h2>
                <div className={styles.section+  " mt-4"}>
                    <h4 className={styles.title}>Detalhes sobre o seu imóvel</h4>
                    <p className={styles.subtitle}>Essas informações são importantes para que seu anúncio apareça corretamente nas buscas dos interessados.</p>
                    <Increment
                        title="Quantos quartos?"
                        subtitle="Incluindo suítes"
                        value={numberRooms.value}
                        onChange={numberRooms.onChange}
                        max={5}
                        min={1}
                    />
                    <Increment
                        title="Destes, quantos são suítes?"
                        subtitle={null}
                        value={numberSuites.value}
                        onChange={numberSuites.onChange}
                        max={numberRooms.value}
                        min={0}
                    />
                    <Increment
                        title="Quantos banheiros?"
                        subtitle="Não incluir lavabo e serviço."
                        value={numberBathrooms.value}
                        onChange={numberBathrooms.onChange}
                        max={5}
                        min={1}
                    />
                    <Increment
                        title="E garagens?"
                        subtitle="Vagas de carro."
                        value={numberGarages.value}
                        onChange={numberGarages.onChange}
                        max={5}
                        min={0}
                    />
                </div>
                <div className={styles.section +  " mt-4"}>
                    <h4 className={styles.title}>Quantos m²?</h4>
                    <p className={styles.subtitle}>Informe a área útil. Você pode informar um tamanho aproximado e alterar depois.</p>
                    <Input 
                        id={"area"}
                        label={""}
                        placeholder={""}
                        type={"text"}
                        {...area}
                    />
                </div>
                <div className={styles.section +  " mt-4"}>
                    <Boolean title={"É uma cobertura?"}/>
                    <Boolean title={"Inquilinos podem ter animais de estimação?"}/>
                    <Boolean title={"Tem piscina no condomínio?"}/>
                </div>
                <div className={styles.section +  " mt-4"}>
                    <MultiSelect title={"Qual o horário da portaria?"} options={listConcierge}/>
                    <MultiSelect title={"Alguém mora no imóvel atualmente?"} options={listStateImmobile}/>
                    <MultiSelect title={"Qual o tipo de chave?"} options={listTypeKey}/>
                    <MultiSelect title={"Qual é a sua relação com o imóvel?"} options={listImmovableRelationship}/>
                </div>
            </div>
        </div>
    );
}