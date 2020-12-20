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
  return input.split('\n').filter(Boolean).map(row => row.split(''))
}

function getNeighborDirections (i, j, width, height) {
  let neighbors = [
    { x: -1, y: -1 },
    { x: -1, y: 0   },
    { x: -1, y: 1 },
    { x: 0,   y: -1 },
    { x: 0,   y: 1 },
    { x: 1, y: -1 },
    { x: 1, y: 0   },
    { x: 1, y: 1 }
  ]

  return neighbors.filter(({x, y}) => i + x >= 0 && i + x < width && j + y >=0 && j + y < height)
}

function main () {
  let layout = getInput()
  let newLayout = layout.map(row => row.slice())
  let changeCount = 1

  while (changeCount) {
    changeCount = 0

    for (let j = 0; j < newLayout.length; j++) {
      for (let i = 0; i < newLayout[j].length; i++) {
        let seat = layout[j][i]
        if (seat == '.') {
          continue
        }
        let directions = getNeighborDirections(i, j, newLayout[j].length, newLayout.length)
        let occupiedNeighborsCount = directions.reduce((count, { x, y }) => {
          if (layout[j+y][i+x] === '#') {
            return count + 1
          }
          return count
        }, 0)

        if (seat == 'L' && occupiedNeighborsCount == 0) {
          newLayout[j][i] = '#'
          changeCount++
        } else if (seat == '#' && occupiedNeighborsCount >= 4) {
          newLayout[j][i] = 'L'
          changeCount++
        } else {
          newLayout[j][i] = seat
        }
      }
    }
    [ layout, newLayout ] = [ newLayout, layout ]
  }

  let occupied = layout.reduce((count, row) => {
    return count + row.reduce((count, cell) => {
      return cell == '#' ? ++count : count
    }, 0)
  }, 0)
  console.log(`There are ${occupied} occupied seats.`)
}

function hasNeighborInDirection (layout, i, j, dx, dy) {
  let width = layout[0].length
  let height = layout.length
  i += dx
  j += dy
  while (i >= 0 && i < width && j >=0 && j < height) {
    if (layout[j][i] == '#') {
      return true
    } else if (layout[j][i] == 'L') {
      return false
    }
    i += dx
    j += dy
  }
  return false
}

function main2 () {
  let layout = getInput()
  let newLayout = layout.map(row => row.slice())
  let changeCount = 1

  while (changeCount) {
    changeCount = 0

    for (let j = 0; j < newLayout.length; j++) {
      for (let i = 0; i < newLayout[j].length; i++) {
        let seat = layout[j][i]
        if (seat == '.') {
          continue
        }
        let directions = getNeighborDirections(i, j, newLayout[j].length, newLayout.length)
        let occupiedNeighborsCount = directions.map(({ x, y }) => {
          return hasNeighborInDirection(layout, i, j, x, y)
        }).filter(Boolean).length

        if (seat == 'L' && occupiedNeighborsCount == 0) {
          newLayout[j][i] = '#'
          changeCount++
        } else if (seat == '#' && occupiedNeighborsCount >= 5) {
          newLayout[j][i] = 'L'
          changeCount++
        } else {
          newLayout[j][i] = seat
        }
      }
    }
    [ layout, newLayout ] = [ newLayout, layout ]
  }

  let occupied = layout.reduce((count, row) => {
    return count + row.reduce((count, cell) => {
      return cell == '#' ? ++count : count
    }, 0)
  }, 0)
  console.log(`There are ${occupied} occupied seats with the new rules.`)
}

main()
main2()
