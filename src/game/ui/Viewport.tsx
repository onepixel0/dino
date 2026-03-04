import { useEffect, useRef } from 'react'
import { createGame } from 'game/core/Game'
import styles from './Viewport.module.css'

export const Viewport = () => {
    const containerRef = useRef(null)
    const gameRef = useRef<Phaser.Game | null>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        gameRef.current = createGame(container)

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true)
                gameRef.current = null
            }
        }
    }, [])

    return <div className={styles.game} ref={containerRef}></div>
}
