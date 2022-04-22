import { useContext, useEffect, useState } from "react";
import { FaImage, FaPlus } from "react-icons/fa";
import { AsideBar } from "../../../components/AsideBar";
import { Boolean } from "../../../components/Boolean";
import { Increment } from "../../../components/Increment";
import { Input } from "../../../components/Input";
import { MultiSelect } from "../../../components/MultiSelect";
import { Navbar } from "../../../components/Navbar";
import { AlertContext } from "../../../contexts/AlertContext";
import useForm from "../../../hooks/useForm";
import { useIncrement } from "../../../hooks/useIncrement";
import { useSelect } from "../../../hooks/useSelect";
import { api } from "../../../services/api";
import styles from "./styles.module.scss";

export default function AnunciarImovel() {
    const {alertShow} = useContext(AlertContext);
    const numberRooms = useIncrement(1);
    const numberSuites = useIncrement(0);
    const numberBathrooms = useIncrement(1);
    const numberGarages = useIncrement(0);
    const area = useForm('area');
    const price = useForm('price');
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
    const [photos, setPhotos] = useState<any>([]);

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

    useEffect(() => {
        console.log(photos)
    }, [photos])

    const getZipcode = async () => {
        const res = await api.get(`/address/zipcode/${zipcode.value}`).then(res => res.data.data);
        city.setValue(res.localidade);
        uf.setValue(res.uf);
        locale.setValue(res.logradouro);
    }

    const handleSubmit = async () => {
        const res = await api.post('/immobile/new', {
            number_rooms: numberRooms.value,
            number_suites: numberSuites.value,
            number_bathrooms: numberBathrooms.value,
            number_garages: numberGarages.value,
            area: area.value,
            roof: roof.value,
            pet: pet.value,
            pool: pool.value,
            price: price.value,
            furnitures: mobile.value,
            concierge_operation: concierge.value,
            immobile_state: stateImmobile.value,
            key_type: key.value,
            immovable_relationship: immovableRelationship.value,
            type: types.value
        }).then(async ({data}) => {
            if(photos.length > 0) {
                photos.forEach(async item => {
                    const image = new FormData();
                    image.append('file', item);
                    await api.post(`/photos/upload/${data.data.id}`, image)
                })
            }
            await api.post(`/address/new`, {
                zipcode: zipcode.value,
                locale: locale.value,
                complement: complement.value,
                city: city.value,
                uf: uf.value,
                immobile: data.data.id
            })
            return data;
        });
        if(res.success) {
            alertShow("success", "Anúncio cadastrado com sucesso.");
        } else {
            alertShow("danger", "Falha no login, tente novamente.");
        }
    }

    const changePhotos = async (e) => {
        setPhotos([...photos, e.target.files[0]]);
    }

    useEffect(() => {
        if (zipcode.value.length === 8) {
            getZipcode();
        }
    }, [zipcode.value])

    return (
        <div className={styles.container}>
            <Navbar />
            <AsideBar />
            <div className="d-flex flex-column align-items-center w-100">
                <div className={styles.gallery} style={{ marginTop: 80 }}>
                    <div className={styles.main}>
                        {photos[0] ? <img src={`${URL.createObjectURL(photos[0])}`}/> : <FaImage />}
                    </div>
                    <div className={styles.outer}>
                        <div className="d-flex">
                            <div className={styles.image}>
                            {photos[1] ? <img src={URL.createObjectURL(photos[1])}/> : <FaImage />}
                            </div>
                            <div className={styles.image}>
                            {photos[2] ? <img src={URL.createObjectURL(photos[2])}/> : <FaImage />}
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className={styles.image}>
                            {photos[3] ? <img src={URL.createObjectURL(photos[3])}/> : <FaImage />}
                            </div>
                            <div className={styles.image}>
                            {photos[4] ? <img src={URL.createObjectURL(photos[4])}/> : <FaImage />}
                            </div>
                        </div>
                        <input className="d-none" type="file" name="photo" id="photo" onChange={changePhotos} />
                        <label htmlFor="photo"><FaPlus /></label>
                    </div>
                </div>
                <div className={styles.content}>
                    <h2>Cadastrar imóvel</h2>
                    <div className={styles.section + " mt-4"}>
                        <MultiSelect title={"Qual o tipo do imóvel?"} {...types} />
                    </div>
                    <div className={styles.section + " mt-4"}>
                        <h4 className={styles.title}>Preço do imóvel</h4>
                        <p className={styles.subtitle}>Informe o endereço do imóvel.</p>
                        <Input
                            id={"price"}
                            label={"Preço"}
                            placeholder={""}
                            type={"text"}
                            {...price}
                        />
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
                </div>
                <div className={styles.content}>
                    <h2>Cadastrar imóvel</h2>
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
                        <Boolean title={"É uma cobertura?"} {...roof} />
                        <Boolean title={"Inquilinos podem ter animais de estimação?"} {...pet} />
                        <Boolean title={"Tem piscina no condomínio?"} {...pool} />
                    </div>
                    <div className={styles.section + " mt-4"}>
                        <MultiSelect title={"Qual o horário da portaria?"} {...concierge} />
                        <MultiSelect title={"Alguém mora no imóvel atualmente?"} {...stateImmobile} />
                        <MultiSelect title={"Qual o tipo de chave?"} {...key} />
                        <MultiSelect title={"Qual é a sua relação com o imóvel?"} {...immovableRelationship} />
                    </div>
                    <div className="d-flex w-100 justify-content-center">
                        <button className={styles.btn_submit} onClick={() => handleSubmit()}>Concluir</button>
                    </div>
                </div>
            </div>
        </div>
    );
}