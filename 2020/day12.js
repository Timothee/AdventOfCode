const fs = require('fs')
const process = require('process')

function getInput () {
  let input
  try {
    let inputFilePath = __filename.replace('.js', 'input.txt')
    input = fs.readFileSync(inputFilePath, 'utf8')
  } catch (e) {
    console.error('oops, no input file')
    process.exit(1)
  }
  return input.split('\n').filter(Boolean).map(instruction => ({
    action: instruction.slice(0, 1),
    value: Number(instruction.slice(1))
  }))
}

function main () {
  let x = 0
  let y = 0
  let direction = 90

  for (let { action, value} of getInput()) {
    if (action == 'F') {
      action = {
        0: 'N',
        90: 'E',
        180: 'S',
        270: 'W'
      }[direction]
    }
    switch (action) {
      case 'N': x += value; break
      case 'E': y += value; break
      case 'S': x -= value; break
      case 'W': y -= value; break
      case 'L': direction = (direction - value + 360) % 360; break
      case 'R': direction = (direction + value + 360) % 360; break
    }
    // console.log('     ', { direction, x, y})
  }

  console.log(`The Manhattan distance at the end is ${Math.abs(x) + Math.abs(y)}.`)
}

function main2 () {
  let x = 0
  let y = 0
  let waypointX = 10
  let waypointY = 1

  for (let { action, value} of getInput()) {
    if (action === 'R') {
      action = 'L'
      value = 360 - value
    }

    switch (action) {
      case 'F':
        x += waypointX * value
        y += waypointY * value
        break
      case 'N': waypointY += value; break
      case 'E': waypointX += value; break
      case 'S': waypointY -= value; break
      case 'W': waypointX -= value; break
      case 'L':
        if (value == 90) {
          [waypointX, waypointY] = [-waypointY, waypointX]
        } else if (value == 180) {
          [waypointX, waypointY] = [-waypointX, -waypointY]
        } else if (value == 270) {
          [waypointX, waypointY] = [waypointY, -waypointX]
        } else {
          throw new Error(`what ${value}`)
        }
        break
    }
    // console.log(`     ${action}${value}`, { waypointX, waypointY, x, y})
  }

  console.log(`With proper instructions, the Manhattan distance at the end is ${Math.abs(x) + Math.abs(y)}.`)
}

main()
main2()
