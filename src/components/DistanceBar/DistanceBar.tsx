import { useSnapshot } from 'valtio'
import styles from './DistanceBar.module.css'
import { storage } from '@/shared/storage'

export const DistanceBar = () => {
    const { distQuantized } = useSnapshot(storage)

    return (
        <div className={styles.distanceBar}>
            <span>{`Distance: ${distQuantized.toFixed()}`}</span>
        </div>
    )
}
