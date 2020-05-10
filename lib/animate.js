const animate = (time, onTick, onComplete) => {
    let start = null

    const step = timestamp => {
        if (!start) {
            start = timestamp
        }

        const timeSpent = timestamp - start
        const progress = Math.min(timeSpent, time) / time

        if (onTick) {
            onTick(progress)
        }

        if (timeSpent < time) {
            window.requestAnimationFrame(step)
        } else {
            if (onComplete) {
                onComplete()
            }
        }
    }

    window.requestAnimationFrame(step)
}

module.exports = animate
