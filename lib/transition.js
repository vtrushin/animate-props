const animate = require('./animate')

const transition = (time, from, to, onTick, onComplete, config = {}) => {
    const { easing } = config;

    const commonFields = Object.keys(from).filter(key => key in to);

    animate(
        time,
            value => {
                onTick(
                    Object.fromEntries(commonFields.map(field => {
                        return [
                            field,
                            (to[field] - from[field]) * (easing ? easing(value) : value) + from[field]
                        ]
                    }))
                );

            },
            onComplete
        );
};

module.exports = transition
