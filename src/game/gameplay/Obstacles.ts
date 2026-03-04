import { storage } from '@/shared/storage'

const MIN_SPAWN_DIST = 600
const MAX_SPAWN_DIST = 1200

export class Obstacles {
    private pool: Phaser.GameObjects.Group

    private distanceSinceLastSpawn: number = 0
    private nextSpawnPosition: number = 0

    get body() {
        return this.pool
    }

    constructor(private scene: Phaser.Scene) {
        this.pool = scene.physics.add.group()
    }

    update(_time: number, dt: number) {
        const dist = dt * storage.speed
        this.distanceSinceLastSpawn += dist

        this.pool.getChildren().forEach((obstacle) => {
            const tree = obstacle as Phaser.Physics.Arcade.Sprite
            tree.x -= dt * storage.speed
            if (tree.active && this.isOutOfLeftBorder(tree.x)) {
                this.pool.killAndHide(tree)
            }
        })

        if (this.distanceSinceLastSpawn >= this.nextSpawnPosition) {
            this.createNextObstacle()
            this.distanceSinceLastSpawn = 0
            this.nextSpawnPosition = Phaser.Math.Between(MIN_SPAWN_DIST, MAX_SPAWN_DIST)
        }
    }

    private createNextObstacle() {
        const x = this.getRightBorder()
        const tree = this.pool.get(x, 0, 'tree') as Phaser.Physics.Arcade.Sprite
        tree.setVisible(true)
        tree.setActive(true)

        tree.setOrigin(0.5, 1)
        tree.setScale(4)

        tree.body!.setSize(12, 24)
    }

    private getRightBorder(): number {
        const { width } = this.scene.scale
        const camera = this.scene.cameras.main

        return width / 2 / camera.zoom + 100
    }

    private isOutOfLeftBorder(position: number): boolean {
        const { width } = this.scene.scale
        const camera = this.scene.cameras.main
        const left = -(width / 2 / camera.zoom + 100)
        return position < left
    }
}
