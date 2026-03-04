export class Camera {
    constructor(private scene: Phaser.Scene) {
        const camera = scene.cameras.main
        camera.centerOn(0, 0)
        camera.zoom = 2

        this.scene.scale.on('resize', this.onResize, this)
    }

    destroy() {
        this.scene.scale.off('resize', this.onResize, this)
    }

    private onResize() {
        this.scene.cameras.main.centerOn(0, 0)
    }
}
