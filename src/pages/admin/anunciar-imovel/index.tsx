import { useState } from "react";
import { AsideBar } from "../../../components/AsideBar";
import { Increment } from "../../../components/Increment";
import { Navbar } from "../../../components/Navbar";
import { useIncrement } from "../../../hooks/useIncrement";
import styles from "./styles.module.scss";

export default function AnunciarImovel() {
    const numberRooms = useIncrement(1);
    const numberSuites = useIncrement(0);
    const numberBathrooms = useIncrement(1);
    const numberGarages = useIncrement(0);

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
                    
                </div>
            </div>
        </div>
    );
}