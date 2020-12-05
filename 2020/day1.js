const fs = require('fs')
const process = require('process')

function getInput () {
  let input
  try {
    input = fs.readFileSync('./2020/day1input.txt', 'utf8')
  } catch (e) {
    console.error('oops, no input file')
  }
  return input.split('\n').filter(Boolean).map(Number)
}

function main () {
  let encounteredNumbers = {}
  for (let number of getInput()) {
    if (encounteredNumbers[2020 - number]) {
      console.log('Product of two entries that sum to 2020:', (2020 - number) * number)
      return
    }
    encounteredNumbers[number] = true
  }

  process.exit(1)
}

function main2 () {
  let input = getInput()
  input.sort((a, b) => a - b)

  let i = 0
  let j = 1
  let k = 2

  function incrementK () {
    if (k < input.length - 1) {
      k++
    } else {
      incrementJ()
    }
  }

  function incrementJ () {
    if (j < input.length - 2) {
      j++
      k = j + 1
    } else {
      incrementI()
    }
  }

  function incrementI() {
    i++
    j = i + 1
    k = j + 1
  }

  while (input[i] + input[j] + input[k] != 2020) {
    if (input[i] + input[j] > 2020) {
      incrementI()
    } else if (input[i] + input[j] + input[k] > 2020) {
      incrementJ()
      continue
    } else {
      incrementK()
    }
  }
  console.log('Product of three entries that sum to 2020:', input[i] * input[j] * input[k])
}

main()
main2()
