import { proxy } from 'valtio'

class Storage {
    readonly maxHealth: number = 3
    readonly initialSpeed: number = 0.3
    readonly speedIncrement: number = 0.01

    health: number = 0
    distance: number = 0
    speed: number = 0

    get distQuantized(): number {
        return Math.floor(this.distance / 100)
    }

    constructor() {
        this.reset()
    }

    reset() {
        this.health = this.maxHealth
        this.distance = 0
        this.speed = this.initialSpeed
    }

    makeDamage() {
        this.health--
    }

    increaseDistance(value: number) {
        this.distance += value
    }

    increaseSpeed() {
        this.speed += this.speedIncrement
    }
}

export const storage = proxy(new Storage())
