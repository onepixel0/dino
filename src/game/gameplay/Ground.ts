import { storage } from '@/shared/storage'

export class Ground {
    ground: Phaser.GameObjects.TileSprite
    body: Phaser.Physics.Arcade.StaticBody

    constructor(scene: Phaser.Scene) {
        const { width } = scene.scale

        const texture = scene.textures.get('foreground')
        const frame = texture.get(texture.firstFrame)
        const groundHeight = 100

        const ground = scene.add.tileSprite(0, 0, width, groundHeight, 'foreground')
        ground.setOrigin(0.5, 0)
        ground.tileScaleX = groundHeight / frame.width
        ground.tileScaleY = groundHeight / frame.height
        this.ground = ground

        const groundBody = scene.physics.add.staticBody(-width / 2, 0, width, groundHeight)
        this.body = groundBody
    }

    update(_time: number, dt: number) {
        this.ground.tilePositionX += (dt * storage.speed) / this.ground.tileScaleX
    }
}
