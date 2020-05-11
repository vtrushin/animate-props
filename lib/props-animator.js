import EventEmitter from 'eventemitter3'

export default class PropsAnimator {
    _currentTime = 0
    _isPlaying = false
    _emitter = new EventEmitter()

    constructor(transitions = {}, config = {}) {
        this._transitions = transitions

        this._state = (
            Object.fromEntries(
                Object.entries(transitions)
                    .map(([objectName, props]) => [
                        objectName,
                        Object.fromEntries(
                            Object.entries(props).map(([propName]) => [propName, null])
                        )
                    ])
            )
        )

        this._duration = Math.max(
            0,
            ...Object.entries(transitions)
                .flatMap(([_, props]) => Object.entries(props))
                .map(([_, transitionMap]) => transitionMap)
                .flat()
                .map(([start, cfg]) => start + cfg.duration)
        )
    }

    // add = transition => {
    //     this._transitions.push(transition)
    // }

    play() {
        return (async () => {
            let startTime = null
            this._isPlaying = true
            const startCurrentTime = this._currentTime

            while (this._isPlaying && this._currentTime <= this._duration) {
                if (!this._isPlaying) {
                    return
                }

                const timestamp = await new Promise(window.requestAnimationFrame)

                if (!startTime) {
                    startTime = timestamp
                }

                this._currentTime = startCurrentTime + timestamp - startTime
                this._update()
            }

            this._emitter.emit('finish')
        })()
    }

    // nextFrame = async () => {
    //     const timestamp = await new Promise(window.requestAnimationFrame)
    //     this._nextFrame()
    // }

    _update() {
        Object.entries(this._transitions).forEach(([objectName, props]) => {
            Object.entries(props).forEach(([propName, transitionMap]) => {
                const transitionIndex = transitionMap.findIndex(([start, config], i) => {
                    if (this._currentTime >= start && this._currentTime <= start + config.duration) {
                        return true
                    }
                })

                if (transitionIndex !== -1) {
                    const [start, config] = transitionMap[transitionIndex]
                    const startValue = transitionMap[transitionIndex - 1] ? transitionMap[transitionIndex - 1][1].value : 0
                    const progress = (this._currentTime - start) / config.duration
                    this._state[objectName][propName] = startValue + (config.value - startValue) * progress
                } else {
                    this._state[objectName][propName] = null
                }
            })
        })

        this._emitter.emit('update', Math.min(this._currentTime, this._duration), this._state)
    }

    pause() {
        this._isPlaying = false
    }

    stop() {

    }

    seekTo() {

    }

    addEventListener(type, handler) {
        this._emitter.on(type, handler)
    }

    removeEventListener(type, handler) {
        this._emitter.removeListener(type, handler)
    }
}
