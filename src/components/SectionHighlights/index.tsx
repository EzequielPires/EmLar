import { CardAnnouncement } from "../CardAnnouncement";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

const announcement = {
    img: "https://richtergruppe.com.br/wp-content/uploads/312484-como-escolher-o-momento-certo-para-vender-um-terreno-ou-imovel.jpg",
    title: "Rua Castanho Mirin",
    price: "500.000,00"
}

export function SectionHighlights() {
    const [immobiles, setImmobiles] = useState([]);

    const handleImmobiles = async () => {
        await api.get('/immobile/list').then(res => {
            console.log(res.data.data);
            setImmobiles(res.data.data);
        })
    }

    useEffect(() => {
        handleImmobiles();
    }, [])
    return (
        <div className={styles.section_highlights}>
            <div className="container">
                <h4 className={styles.title}>Imóveis em destaque</h4>
                <div className={styles.wrap}>
                    <Swiper
                        modules={[Navigation]}
                        id={styles.swiper}
                        spaceBetween={24}
                        slidesPerView={'auto'}
                        navigation
                    >
                        {immobiles.length > 0 ? immobiles.map(item => <SwiperSlide key={item.id} id={styles.swiper_slide}><CardAnnouncement announcement={item} /></SwiperSlide>) : null}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}