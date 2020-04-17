const draw = require('../src/draw')
const test = require('tape')
const constants = require('../src/constants')

test('actor should be drawn to canvas in the right place', function (t) {
  const actors = [{ x: 1, y: 1 }]
  const canvas = {
    getContext: () => {
      return {
        fillRect: (x, y, width, height) => {
          const cellSize = canvas.width / constants.GRID_RESOLUTION
          t.equal(x, actors[0].x * cellSize)
          t.equal(y, actors[0].y * cellSize)
          t.equal(width, cellSize)
          t.equal(height, cellSize)
        },
        fillStyle: () => { },
      }
    },
    width: 100
  }
  draw(canvas, actors)
  t.end()
})

test('All actors in the actor list should be drawn to canvas with the right color', function (t) {
  const actors = [
    { x: 1, y: 1, color: constants.RED() },
    { x: 2, y: 2, color: constants.BLUE() },
    { x: 3, y: 0, color: constants.GREEN() }
  ]
  const testState = []
  const canvas = {
    getContext: () => {
      const ctx = {
        fillRect: (x, y, width, height) => {
          testState.push({ x: x, y: y, color: ctx.fillStyle })
        },
        fillStyle: null,
      }

      return ctx
    },
    width: 100
  }
  draw(canvas, actors)
  t.deepEqual(testState, actors)
  t.end()
})