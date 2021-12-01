window.addEventListener('load', () => {

const canvas = document.querySelector('#draw')
// se dibuja sobre el context6
const ctx = canvas.getContext('2d')

// seteamos el ancho de canvas para que sea igual al ancho del viewport
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// iniciamos valores
let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0
let direction = true

// c6tentx set
ctx.lineWidth = 0
ctx.strokeStyle = "BADA55"
ctx.lineJoin = "round"
ctx.lineCap = "round"

function draw(e) {
    if (!isDrawing) return

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()

    lastX = e.offsetX
    lastY = e.offsetY

    if (hue >= 360) hue = 0
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) direction = !direction
    direction ? ctx.lineWidth++ : ctx.lineWidth--
    hue++
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true
    lastX = e.offsetX
    lastY = e.offsetY
    draw(e)
})
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => isDrawing = false)
canvas.addEventListener('mouseout', () => isDrawing = false)

})