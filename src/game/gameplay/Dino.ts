import { storage } from '@/shared/storage'

export class Dino {
    private dino: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

    private isJumping: boolean = false
    private isDamaging: boolean = false

    get body() {
        return this.dino
    }

    constructor(private scene: Phaser.Scene) {
        const dino = scene.physics.add.sprite(0, 0, 'dino-red', 'idle_01')
        dino.body.setSize(8, 18)
        dino.body.setAllowGravity(true)
        dino.body.setGravityY(1000)
        dino.setOrigin(0.5, 1)
        dino.setPosition(-150, 0)
        dino.setDisplaySize(100, 100)
        dino.setDepth(10)
        this.dino = dino
        this.animRun()

        this.scene.input.on('pointerdown', this.onPointerDown, this)
    }

    destroy() {
        this.scene.input.off('pointerdown', this.onPointerDown, this)
    }

    private onPointerDown() {
        if (this.isJumping) return
        this.isJumping = true

        this.dino.body.setVelocityY(-600)
        this.animJump()
    }

    onGroundCollide() {
        if (!this.isJumping) return
        this.isJumping = false
        this.animRun()
    }

    onObstacleCollide() {
        if (this.isDamaging) return
        this.isDamaging = true

        storage.makeDamage()

        this.animDamage()

        if (storage.health <= 0) {
            this.scene.events.emit('gameover')
        } else {
            this.scene.time.addEvent({
                delay: 700,
                callback: () => {
                    this.isDamaging = false
                    this.animRun()
                },
            })
        }
    }

    private animJump() {
        this.dino.play('dino_idle', true)
    }

    private animDamage() {
        this.dino.play('dino_damage', true)
    }

    private animRun() {
        this.dino.play('dino_run', true)
    }
}
