import { Resize } from './Resize'
import { MainScene } from './MainScene'

class Game extends Phaser.Game {
    private disposers: (() => void)[] = []

    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config)

        const resize = new Resize(this.scale)
        this.disposers.push(() => resize.destroy())

        this.events.once('destroy', this.onDestroy, this)
    }

    private onDestroy() {
        console.log('Game.onDestroy')
        this.disposers.forEach((dispose) => dispose())
        this.disposers = []
    }
}

export const createGame = (parent: HTMLElement) => {
    const scale = window.devicePixelRatio
    const width = parent.clientWidth * scale
    const height = parent.clientHeight * scale

    const config: Phaser.Types.Core.GameConfig = {
        parent: parent,
        audio: {
            noAudio: true,
        },
        pixelArt: true,
        scale: {
            width: width,
            height: height,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
            },
        },
        scene: [MainScene],
    }

    return new Game(config)
}
