import { useEffect, useState } from "react";
import { AsideBar } from "../../../components/AsideBar";
import { Boolean } from "../../../components/Boolean";
import { Increment } from "../../../components/Increment";
import { Input } from "../../../components/Input";
import { MultiSelect } from "../../../components/MultiSelect";
import { Navbar } from "../../../components/Navbar";
import useForm from "../../../hooks/useForm";
import { useIncrement } from "../../../hooks/useIncrement";
import { useSelect } from "../../../hooks/useSelect";
import { api } from "../../../services/api";
import styles from "./styles.module.scss";

export default function AnunciarImovel() {
    const numberRooms = useIncrement(1);
    const numberSuites = useIncrement(0);
    const numberBathrooms = useIncrement(1);
    const numberGarages = useIncrement(0);
    const area = useForm('area');
    const zipcode = useForm('cep');
    const city = useForm('city');
    const uf = useForm('uf');
    const locale = useForm('locale');
    const complement = useForm('complement');
    const types = useSelect();
    const mobile = useSelect();
    const concierge = useSelect();
    const key = useSelect();
    const roof = useSelect();
    const pet = useSelect();
    const pool = useSelect();
    const stateImmobile = useSelect();
    const immovableRelationship = useSelect();

    const getTypesImmobiles = async () => {
        await api.get('/type-immobile/list').then(res => types.setOptions(res.data.data));
        await api.get('/concierge/list').then(res => concierge.setOptions(res.data.data));
        await api.get('/furniture/list').then(res => mobile.setOptions(res.data.data));
        await api.get('/key/list').then(res => key.setOptions(res.data.data));
        await api.get('/state-immobile/list').then(res => stateImmobile.setOptions(res.data.data));
        await api.get('/immovable-relationship/list').then(res => immovableRelationship.setOptions(res.data.data));
    }

    useEffect(() => {
        getTypesImmobiles();
    }, []);

    const getZipcode = async () => {
        const res = await api.get(`/address/zipcode/${zipcode.value}`).then(res => res.data.data);
        city.setValue(res.localidade);
        uf.setValue(res.uf);
        locale.setValue(res.logradouro);
    }

    useEffect(() => {
        if(zipcode.value.length === 8) {
            getZipcode();
        }    
    }, [zipcode.value])

    return (
        <div className={styles.container}>
            <Navbar />
            <AsideBar />
            <div className={styles.content}>
                <h2>Cadastrar imóvel</h2>
                <div className={styles.section + " mt-4"}>
                    <MultiSelect title={"Qual o tipo do imóvel?"} {...types} />
                </div>
                <div className={styles.section + " mt-4"}>
                    <h4 className={styles.title}>Endereço do imóvel</h4>
                    <p className={styles.subtitle}>Informe o endereço do imóvel.</p>
                    <Input
                        id={"cep"}
                        label={"CEP"}
                        placeholder={""}
                        type={"text"}
                        {...zipcode}
                    />
                    <div className="d-flex gap-4 w-100 my-4">
                        <Input
                            id={"city"}
                            label={"Cidade"}
                            placeholder={""}
                            type={"text"}
                            {...city}
                        />
                        <Input
                            id={"state"}
                            label={"UF"}
                            placeholder={""}
                            type={"text"}
                            {...uf}
                        />
                    </div>
                    <Input
                        id={"locale"}
                        label={"Logradouro"}
                        placeholder={""}
                        type={"text"}
                        {...locale}
                    />
                    <div className="mt-4"></div>
                    <Input
                        id={"complement"}
                        label={"Complemento"}
                        placeholder={""}
                        type={"text"}
                        {...complement}
                    />
                </div>
                <div className={styles.section + " mt-4"}>
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
                <div className={styles.section + " mt-4"}>
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
                <div className={styles.section + " mt-4"}>
                    <Boolean title={"É uma cobertura?"} {...roof}/>
                    <Boolean title={"Inquilinos podem ter animais de estimação?"} {...pet}/>
                    <Boolean title={"Tem piscina no condomínio?"} {...pool}/>
                </div>
                <div className={styles.section + " mt-4"}>
                    <MultiSelect title={"Qual o horário da portaria?"} {...concierge} />
                    <MultiSelect title={"Alguém mora no imóvel atualmente?"} {...stateImmobile} />
                    <MultiSelect title={"Qual o tipo de chave?"} {...key} />
                    <MultiSelect title={"Qual é a sua relação com o imóvel?"} {...immovableRelationship} />
                </div>
            </div>
        </div>
    );
}