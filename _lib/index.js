import { fabric } from 'fabricjs'

const canvas = new fabric.Canvas('canvas')

const str = 'Текст, который\nдолжен переноситься'
const text = new fabric.Text(str, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    textBackgroundColor: 'lime',
    angle: -10,
    originX: 'center',
    originY: 'center'
})

const text2 = new fabric.Text(str, {
    left: 100,
    top: canvas.height / 2,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    textBackgroundColor: 'lime',
    angle: -10,
    originX: 'center',
    originY: 'center'
})

class Grid extends fabric.Group {
    constructor(props) {
        super(props)

        console.log('props', props)
    }

    initialize(...props) {
        super.initialize(...props)

        console.log(111)
    }

    _render(ctx) {
        super._render(ctx)

        console.log(222)

        this.width = 200
        this.height = 200

        ctx.beginPath()
        ctx.rect(20, 20, 150, 100)
        ctx.stroke()
    }
}

Grid.type = 'customobject'

const group = new Grid([
    text,
    text2,
], {
    left: 0,
    top: 0
})

setTimeout(() => {
    text.set({
        left: 10
    })

    canvas.renderAll()
}, 2000)

canvas.add(group)

// text.animate('angle', 45, {
//     onChange: () => canvas.renderAll()
// })
