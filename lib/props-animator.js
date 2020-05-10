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
                    .map(([name, props]) => [
                        name,
                        Object.fromEntries(
                            Object.entries(props).map(([propName]) => [propName, null])
                        )
                    ])
            )
        )


        this._duration = Math.max(
            0,
            ...Object.entries(transitions)
                .flatMap(([_, cfg]) => Object.entries(cfg))
                .map(([_, cfg]) => cfg)
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
        Object.entries(this._transitions).forEach(([trName, props]) => {
            // console.log(name, props)

            Object.entries(props).forEach(([name, transitionConfigs]) => {
                transitionConfigs.forEach(([start, transCfg]) => {
                    if (this._currentTime >= start && this._currentTime <= start + transCfg.duration) {

                        const progress = (this._currentTime - start) / transCfg.duration

                        this._state[trName][name] += progress

                        console.log(222, this._state[trName][name])

                        // console.log(this._state[trName][name])
                        // console.log(trName)
                    }
                })
            })

        })

        this._emitter.emit('update', Math.min(this._currentTime, this._duration))
    }

    pause() {
        this._isPlaying = false
    }

    stop() {

    }

    addEventListener(type, handler) {
        this._emitter.on(type, handler)
    }

    removeEventListener(type, handler) {
        this._emitter.removeListener(type, handler)
    }
}
