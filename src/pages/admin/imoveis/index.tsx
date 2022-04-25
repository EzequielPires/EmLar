import { useEffect, useState } from "react";
import { AsideBar } from "../../../components/AsideBar";
import { CardAnnouncement } from "../../../components/CardAnnouncement";
import { Navbar } from "../../../components/Navbar";
import { api } from "../../../services/api";
import styles from "./styles.module.scss";

export default function Imoveis() {
    const [immobiles, setImmobiles] = useState([]);
    const handleImmobiles = async () => {
        const res = await api.get('/immobile/my-immobiles').then(res => res.data);
        console.log(res)
        res.success && setImmobiles(res.data);
    }
    useEffect(() => {
        handleImmobiles();
    }, []);
    return (
        <div className={styles.imoveis}>
            <Navbar />
            <AsideBar />
            <div className={styles.content}>
                <h2>Meus Anúncios</h2>
                <div className="d-flex flex-wrap gap-4">
                    {immobiles?.map(item => (
                        <CardAnnouncement key={item.id} announcement={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}