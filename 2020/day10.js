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
  return input.split('\n').filter(Boolean).map(Number)
}

function main () {
  let input = getInput()
  input.sort((a, b) => a - b)

  let distribution = {
    1: 0,
    2: 0,
    3: 1
  }
  input.unshift(0)

  for (let i = 1; i < input.length; i++) {
    distribution[input[i] - input[i - 1]]++
  }
  console.log(`1-jolt count x 3-jolt count = ${distribution[1] * distribution[3]}.`)
}

function numberOfWaysToCoverThatSpread (length) {
  if (length == 1) return 1
  if (length == 2) return 2
  if (length == 3) return 4

  // From a particular point in the chain to the end, you can pick one of three
  // next points. For that point in the chain, the number of ways to reach the
  // end is the sum of the number of ways to reach the end once you've made
  // that 1 in 3 decision.
  return numberOfWaysToCoverThatSpread(length - 1) +
    numberOfWaysToCoverThatSpread(length - 2) +
    numberOfWaysToCoverThatSpread(length - 3)
}

function main2 () {
  let input = getInput()
  input.sort((a, b) => a - b)

  // Add the outlet
  input.unshift(0)
  // Add the device
  input.push(input[input.length - 1] + 3)

  let product = 1
  let startIndex = 0
  let endingIndex = 1

  while (endingIndex < input.length) {
    // We look for subsets of 1-jolt differentials. When it's a 3-jolt jump,
    // there's only one way to reach it: reach the last part of the 1-jolt
    // subset and move up by 3.
    // So once we have a subset of 1-jolt, we calculate the number of ways we
    // can navigate it. We use that value to multiply the end result
    if (input[endingIndex + 1] - input[endingIndex] === 3) {
      let subsetLength = endingIndex - startIndex
      product *= numberOfWaysToCoverThatSpread(subsetLength)

      startIndex = endingIndex + 1
      while (input[startIndex + 1] - input[startIndex] === 3) {
        startIndex++
      }
      endingIndex = startIndex + 1
    } else {
      endingIndex++
    }

  }
  console.log(`Distinct ways to arrange adapters: ${product}.`)
}

main()
main2()
