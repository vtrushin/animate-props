let pause = (duration, callback) => currentTime => new Promise(resolve => {
    callback()

    if (currentTime >= duration) {
        resolve()
    }
})

export default pause
