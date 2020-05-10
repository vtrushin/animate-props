const animate = (time, handleTick, {
    easing
} = {}) => {
    let start = null;

    const step = timestamp => {
        if (!start) {
            start = timestamp;
        }

        const timeSpent = timestamp - start;
        const progress = Math.min(timeSpent, time) / time;
        const value = typeof easing === 'function' ? easing(progress) : progress;

        handleTick(value);

        if (timeSpent < time) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
};

const transition = (time, from, to, callback, config = {}) => {
    const { easing } = config;

    const commonFields = Object.keys(from).filter(key => key in to);

    animate(time, value => {
        callback(
            Object.fromEntries(commonFields.map(field => [
                field,
                (to[field] - from[field]) * value + from[field]
            ]))
        );

    }, config);
};

window.animateProps.transition = transition;
