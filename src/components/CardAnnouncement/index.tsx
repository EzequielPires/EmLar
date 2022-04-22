import Link from "next/link";
import { Icon } from "../Icon";
import styles from "./styles.module.scss";

export function CardAnnouncement({ announcement }) {
    return (
        <Link href={"/view/1"}>
            <a>
                <div className={styles.card}>
                    <div className={styles.card_header}>
                        <img src={`http://localhost:3000/photos/${announcement.photos[0].filename}`} alt="" />
                    </div>
                    <div className={styles.card_body}>
                        <span className={styles.price}><span className={styles.mark}>R$ </span>{announcement.price}</span>
                        <span className={styles.title}>{announcement.address ? announcement.address.locale : ''}</span>
                        <div className="d-flex gap-4">
                            <div className={styles.item}>
                                <Icon name={"bed"} color={"#555"} size={20} />
                                <span>3</span>
                            </div>
                            <div className={styles.item}>
                                <Icon name={"bath"} color={"#555"} size={20} />
                                <span>2</span>
                            </div>
                            <div className={styles.item}>
                                <Icon name={"garage"} color={"#555"} size={20} />
                                <span>3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}