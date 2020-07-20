const constants = require('./constants')
const draw = require('./draw')
const random = require('./random')({ randomDir: Math.random, randomPos: Math.random, GRID_RESOLUTION: constants.GRID_RESOLUTION })
const move = require('./move')({ moveActor: random.moveActor })
const init = require('./init')({ randomPos: random.position })
const infect = require('./infect')
const heal = require('./heal')
const canvas = document.getElementById('canvas')
const infectedCount = document.getElementById('infectedCount')
const healthyCount = document.getElementById('healthyCount')
const turnCountNode = document.getElementById('turnCount')
const infectedSlider = document.getElementById('infectedSlider')
const healthySlider = document.getElementById('healthySlider')
const medicSlider = document.getElementById('medicSlider')
let turnCount = 0
let actors = null

initialize()

setInterval(function () {
  draw(canvas, actors)
  actors = heal(infect(move(actors)))
  turnCount++
  turnCountNode.textContent = turnCount
  updateStats(actors, infectedCount, healthyCount)
}, constants.INTERVAL)

function updateStats (actors, infectedCountNode, healthyCountNode) {
  const infectedCount = count(actors, actor => actor.color === constants.colors.RED)
  const healthyCount = count(actors, actor => actor.color === constants.colors.GREEN)

  infectedCountNode.textContent = infectedCount
  healthyCountNode.textContent = healthyCount
}

const count = (xs, predicate) => xs.reduce((acc, x) => predicate(x) ? acc + 1 : acc, 0)

function initialize () {
  actors = init(healthySlider.value, infectedSlider.value, medicSlider.value)
  turnCount = 0
}

healthySlider.oninput = initialize
infectedSlider.oninput = initialize
medicSlider.oninput = initialize
