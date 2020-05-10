import PropsAnimator from './props-animator'

/*const a = {
    object: {
        x: {
            0: { duration: 1000, value: 100 },
            1000: { duration: 1000, value: 100 }
        },
        y: {
            0: { duration: 1000, value: 100 },
            1000: { duration: 1000, value: 100 }
        }
    },
    object1: {
        x: {
            0: { duration: 1000, value: 2000 }
        }
    }
}*/

const transitions = {
    object: {
        x: [
            [0, { duration: 1000, value: 100 }],
            [1000, { duration: 1000, value: 500 }],
        ],
        y: [
            [0, { duration: 1000, value: 100 }],
            [1000, { duration: 1000, value: 500 }],
        ]
    },
    object1: {
        x: [
            [0, { duration: 1000, value: 2000 }]
        ]
    }
    // object1: new Map([
    //     [0, {
    //         duration: 1000,
    //         props: { x: 0, y: 0 }
    //     }],
    //     [100, {
    //         duration: 2000,
    //         props: { x: 0, y: 0 }
    //     }]
    // ]),
    // object2: new Map([
    //     [0, {
    //         duration: 1000,
    //         props: { x: 0, y: 0 }
    //     }],
    //     [200, {
    //         duration: 2000,
    //         props: { x: 0, y: 0 }
    //     }]
    // ])
}

const propsAnimator = new PropsAnimator(transitions, {

})

// const propsAnimator = new PropsAnimator(
//     {
//         object1: { x: 0, y: 0, }
//     },
//     [
//         {
//             at: 1000,
//             duration: 2000,
//             props: {
//                 object1: { x: 100 }
//             }
//         },
//         {
//             at: 5000,
//             duration: 3000,
//             props: {
//                 object1: { x: 500, y: 200 }
//             }
//         }
//     ]
// )

propsAnimator.addEventListener('update', time => {
    console.log('update', time)
})

propsAnimator.addEventListener('finish', () => {
    console.log('FINISH!!!')
})

propsAnimator.play()

// const animator = new PropsAnimator()
//
// animator.addEventListener('tick', () => {
//     console.log(11)
// })
//
// export default PropsAnimator

// import html2canvas from 'html2canvas'
//
// html2canvas(document.querySelector('#capture')).then(canvas => {
//     document.body.appendChild(canvas)
// });

// const animate = (time, handleTick) => {
//     let start = null
//
//     const step = timestamp => {
//         if (!start) {
//             start = timestamp
//         }
//
//         const timeSpent = timestamp - start
//         const progress = Math.min(timeSpent, time) / time
//
//         handleTick(progress)
//
//         if (timeSpent < time) {
//             window.requestAnimationFrame(step)
//         }
//     }
//
//     window.requestAnimationFrame(step)
// }
//
// animate(500, )
