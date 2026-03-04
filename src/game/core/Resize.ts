export class Resize {
    private resizeHandler: () => void

    constructor(private scale: Phaser.Scale.ScaleManager) {
        this.resizeHandler = this.onResize.bind(this)

        window.addEventListener('resize', this.resizeHandler)
        window.addEventListener('orientationchange', this.resizeHandler)
        this.onResize()
    }

    destroy() {
        window.removeEventListener('resize', this.resizeHandler)
        window.removeEventListener('orientationchange', this.resizeHandler)
    }

    private onResize() {
        const scale = this.scale
        const displayScale = Math.max(scale.displayScale.x, scale.displayScale.y)
        const parent = this.scale.parent
        scale.setGameSize(parent.clientWidth * displayScale, parent.clientHeight * displayScale)
        scale.refresh()
    }
}
