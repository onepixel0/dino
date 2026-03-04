import { storage } from '@/shared/storage'

export class Background {
    private bg: Phaser.GameObjects.TileSprite

    constructor(scene: Phaser.Scene) {
        const { width } = scene.scale

        const bgHeight = 500
        const bg = scene.add.tileSprite(0, -bgHeight / 2, width, bgHeight, 'tile')
        bg.setTileScale(3,3)
        this.bg = bg
    }

    update(_time: number, dt: number) {
        this.bg.tilePositionX += (dt * storage.speed * 0.2) / this.bg.tileScaleX
    }
}
