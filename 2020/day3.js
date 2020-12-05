const fs = require('fs')
const process = require('process')

function getInput () {
  let input
  try {
    input = fs.readFileSync('./2020/day3input.txt', 'utf8')
  } catch (e) {
    console.error('oops, no input file')
  }
  return input.split('\n').filter(Boolean) // .slice(0, 8)
}

function main () {
  let pattern = getInput()
  let slope = 3

  let treeCount = 0
  let i = 0
  let j = 0

  for (let line of pattern) {
    if (line[i] == '#') {
      treeCount++
    }
    i = (i + slope) % line.length
  }

  console.log(`I will hit ${treeCount} trees on the way down.`)
}

function main2 () {
  let pattern = getInput()
  let slopes = [
    { deltaX: 1, deltaY: 1},
    { deltaX: 3, deltaY: 1},
    { deltaX: 5, deltaY: 1},
    { deltaX: 7, deltaY: 1},
    { deltaX: 1, deltaY: 2}
  ]

  let treeCounts = []

  for (let { deltaX, deltaY } of slopes) {
    let treeCount = 0
    let i = 0
    let j = 0
    while (j < pattern.length) {
      let line = pattern[j]
      if (line[i] == '#') {
        treeCount++
      }
      i = (i + deltaX) % line.length
      j += deltaY
    }

    treeCounts.push(treeCount)
  }

  console.log(`The product of the tree count for all the slopes is ${treeCounts.reduce((a, b) => a * b)}`)
}

main()
main2()
