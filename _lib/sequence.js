const serial = tasks => {
    let result = Promise.resolve()

    tasks.forEach(task => {
        result = result.then(() => task())
    });

    return result
}

const animate = (time, handleTick) => {
    let start = null

    const step = timestamp => {
        if (!start) {
            start = timestamp
        }

        const timeSpent = timestamp - start
        const progress = Math.min(timeSpent, time) / time

        handleTick(progress)

        if (timeSpent < time) {
            window.requestAnimationFrame(step)
        }
    }

    window.requestAnimationFrame(step)
}

const sequence = async (actions, callback) => {
    // let result = Promise.resolve()

    let time = null

    const next = () => {

    }

    actions.forEach(action => {
        action()
    })
}

export default sequence

