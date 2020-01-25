const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const divRanges = document.getElementById('div')
const divResetButton = document.getElementById('resetDiv')
const pointsRange = document.createElement('input')
const speedRange = document.createElement('input')
const pointsRangeLabel = document.createElement('label')
const speedRangeLabel = document.createElement('label')
const xNLabel = document.createElement('label')
const switchSliderLabel = document.createElement('label')
const switchSlider = document.createElement('label')
const button = document.createElement('button')

divRanges.appendChild(pointsRangeLabel)
divRanges.appendChild(pointsRange)
divRanges.appendChild(speedRangeLabel)
divRanges.appendChild(speedRange)
divRanges.appendChild(xNLabel)
divResetButton.appendChild(switchSliderLabel)
divResetButton.appendChild(switchSlider)
divResetButton.appendChild(button)
pointsRange.setAttribute("type", "range")
speedRange.setAttribute("type", "range")
pointsRange.setAttribute("min", "2")
pointsRange.setAttribute("max", "100")
pointsRangeLabel.innerText = "nPoints"
speedRangeLabel.innerText = "Speed"
switchSliderLabel.innerText = "αN++"
button.innerHTML = "<span>Reset</span> Button"
switchSlider.className = "switch"
switchSlider.innerHTML = "<input type=\"checkbox\"><span class =\"slider round\"></span>"
switchSlider.firstChild.checked = true

button.addEventListener('click', () => {
    multiple = 2
    pointsRange.value = 50
    speedRange.value = 50
    points = pointsRange.value * 10
    inc = mapValue(speedRange.value, 0, 100, 0, 0.025)
    colors = [Color.WHITE.hex()]
})

speedRange.addEventListener('input', () => {
    inc = mapValue(speedRange.value, 0, 100, 0, 0.025)
})

pointsRange.addEventListener('input', () => {
    points = pointsRange.value * 10
})

canvas.addEventListener('mousemove', (click) => {

    if (getMousePosElem(click).distance(centerPos) <= radius)
        document.body.style.cursor = 'pointer'
    else {
        document.body.style.cursor = ''
    }
})

canvas.addEventListener('click', (click) => {
    if (getMousePosElem(click).distance(centerPos) <= radius)
        colors.push(Color.RANDOM.hex())
})


const width = 600
const height = 600
const centerPos = new Vector(width / 2, height / 2)
canvas.width = width
canvas.height = height
let radius = width / 2.25
let points = pointsRange.value * 10
let multiple = 2
let inc = mapValue(speedRange.value, 0, 100, 0, 0.025)
let colors = Array(Color.WHITE.hex())

setInterval(() => {
    clear()
    if (switchSlider.firstChild.checked)
        multiple += inc
    drawLines()
    drawCircle()
    drawPoints()
}, getMs(60))

function drawLines() {
    xNLabel.innerText = `αN: ${Math.trunc(multiple)}`
    ctx.lineWidth = 1
    for (let i = 0; i < points; i++) {
        ctx.strokeStyle = colors[Math.floor(mapValue(i, 0, points, 0, colors.length))]
        ctx.beginPath()
        ctx.moveTo(getPosCircle(i).x, getPosCircle(i).y)
        ctx.lineTo(getPosCircle(i * multiple % points).x, getPosCircle(i * multiple % points).y)
        ctx.stroke()
    }
}

function drawCircle() {
    ctx.strokeStyle = Color.WHITE.hex()
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.ellipse(width / 2, height / 2, width / 2.25, height / 2.25, 0, 0, 2 * Math.PI, false)
    ctx.stroke()
}

function drawPoints() {
    for (let i = 0; i < points; i++) {
        ctx.fillStyle = colors[Math.floor(mapValue(i, 0, points, 0, colors.length))]
        ctx.beginPath()
        ctx.ellipse(getPosCircle(i).x, getPosCircle(i).y, 5, 5, 0, 0, 2 * Math.PI, false)
        ctx.fill()
    }
}

function clear() {
    ctx.clearRect(0, 0, width, height)
}

function getPosCircle(i) {
    return centerPos.clone().addPolar(2 * Math.PI / points * i, radius)
}