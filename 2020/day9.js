const fs = require('fs')
const process = require('process')

const PREAMBLE_SIZE = 25

function getInput () {
  let input
  try {
    let inputFilePath = __filename.replace('.js', 'input.txt')
    input = fs.readFileSync(inputFilePath, 'utf8')
  } catch (e) {
    console.error('oops, no input file')
    process.exit(1)
  }
  return input.split('\n').filter(Boolean).map(Number)
}

function hasSumInPreviousNumbers (previousNumbers, target) {
  for (let i = 0; i < previousNumbers.length - 1; i++) {
    for (let j = i + 1; j < previousNumbers.length; j++) {
      if (previousNumbers[i] + previousNumbers[j] === target) {
        return true
      }
    }
  }
  return false
}

function main () {
  let input = getInput()

  let index = 25
  while (hasSumInPreviousNumbers(input.slice(index - PREAMBLE_SIZE, index), input[index])) {
    index++
  }
  console.log(`The first invalid number is ${input[index]} (at index ${index}).`)
}

function getSum(input, start, end) {
  return input.slice(start, end + 1).reduce((a, b) => a + b)
}

function main2 () {
  let input = getInput()
  let target = 15690279

  let startingIndex = 0
  let endingIndex = 0

  while (getSum(input, startingIndex, endingIndex) !== target) {
    if (getSum(input, startingIndex, endingIndex) < target) {
      endingIndex++
    } else {
      startingIndex++
      endingIndex = startingIndex
    }
  }

  let subset = input.slice(startingIndex, endingIndex + 1)
  let weakness = Math.min(...subset) + Math.max(...subset)

  console.log(`The encryption weakness is ${weakness}.`)
}

main()
main2()
