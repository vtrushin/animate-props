export const createTransition = (mainConfig = {}) => (duration, from, to, callback, config = {}, start = {}) => {
    const { easing } = config
    const { position, offset } = start

    const commonFields = Object.keys(from).filter(key => to.hasOwnProperty(key))

    return {
        tick: (currentTime, complete, contextConfig) => {
            callback(
                Object.fromEntries(commonFields.map(field => [
                    field,
                    (to[field] - from[field]) * (currentTime / duration) + from[field]
                ]))
            )

            if (currentTime >= duration) {
                complete()
            }
        }
    }
}

export default createTransition()
