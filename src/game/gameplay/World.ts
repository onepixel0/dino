import { storage } from '@/shared/storage'
import { Background } from './Background'
import { Dino } from '../core/Dino'
import { Ground } from '../core/Ground'
import { Obstacles } from '../core/Obstacles'
import { Camera } from '../core/Camera'

export class World {
    private bg: Background
    private ground: Ground
    private dino: Dino
    private obstacles: Obstacles
    private camera: Camera

    constructor(private scene: Phaser.Scene) {
        storage.reset()

        this.bg = new Background(scene)
        this.ground = new Ground(scene)
        this.obstacles = new Obstacles(scene)
        this.dino = new Dino(scene)
        this.camera = new Camera(scene)

        this.setupPhysics()

        this.scene.events.on('update', this.update, this)
        this.scene.events.on('gameover', this.onGameover, this)

        this.scene.time.addEvent({
            delay: 1000,
            repeat: -1,
            callback: () => storage.increaseSpeed(),
        })
    }

    destroy() {
        this.scene.events.off('gameover', this.onGameover, this)
        this.scene.events.off('update', this.update, this)
        this.dino.destroy()
        this.camera.destroy()
    }

    update(time: number, dt: number) {
        storage.increaseDistance(dt * storage.speed)

        this.bg.update(time, dt)
        this.ground.update(time, dt)
        this.obstacles.update(time, dt)
    }

    private onGameover() {
        this.scene.scene.pause()
        setTimeout(() => this.scene.scene.restart(), 1000)
    }

    private setupPhysics() {
        const physics = this.scene.physics

        physics.add.collider(
            this.ground.body,
            this.dino.body,
            () => this.dino.onGroundCollide(),
            undefined,
            this,
        )

        physics.add.overlap(
            this.obstacles.body,
            this.dino.body,
            () => this.dino.onObstacleCollide(),
            undefined,
            this,
        )
    }
}
