import 'phaser'
import { World } from '../gameplay/World'

export class MainScene extends Phaser.Scene {
    private world!: World

    preload() {
        this.load.pack('main', 'main-pack.json')
    }

    create() {
        this.world = new World(this)
        this.events.once('shutdown', this.onShutdown, this)
    }

    private onShutdown() {
        this.world.destroy()
    }
}
