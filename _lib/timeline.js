const serial = tasks => {
    let result = Promise.resolve()

    tasks.forEach(task => {
        result = result.then(() => task())
    });

    return result
}

const timeline = (animations) => {
    animations.reduceRight(animation => {
        console.log(animation);

        return animation;
    }, Promise.resolve());
};

serial([
    pause(4000),
    transition(500, { a: 100, b: 200}),
    pause(2000),
    pause(1000),
]);

window.animateProps.timeline = timeline;


[
    pause(100),
    transition(500, { a: 100, b: 200}, value => {

    }),
    [
        transition(500, { a: 100, b: 200}),
        transition(500, { a: 100, b: 200}),
        transition(500, { a: 100, b: 200}),
    ]
]
