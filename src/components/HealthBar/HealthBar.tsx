import { useSnapshot } from 'valtio'
import styles from './HealthBar.module.css'
import { storage } from '@/shared/storage'
import { useEffect, useState } from 'react'
import { images } from '@/shared/images'

type Heart = { isEmpty: boolean }

export const HealthBar = () => {
    const defaultHearts = Array.from({ length: storage.maxHealth }, () => ({ isEmpty: false }))

    const [hearts, setHearts] = useState<Heart[]>(defaultHearts)
    const { health } = useSnapshot(storage)

    useEffect(() => {
        setHearts((prev) => prev.map((heart, i) => ({ ...heart, isEmpty: i >= health })))
    }, [health])

    return (
        <div className={styles.healthBar}>
            {hearts.map((item, index) => {
                return (
                    <div className={styles.heart} key={index}>
                        <img src={item.isEmpty ? images.heartEmpty : images.heartFull} />
                    </div>
                )
            })}
        </div>
    )
}
