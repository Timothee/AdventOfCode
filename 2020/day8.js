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
  return input.split('\n')
    .filter(Boolean)
    .map(line => line.split(' '))
    .map(parts => ({
      instruction: parts[0],
      value: Number(parts[1])
    }))
}

function main () {
  let instructions = getInput()
  let accumulator = 0
  let index = 0
  let seenInstructions = {}

  while (!seenInstructions[index] && index < instructions.length) {
    seenInstructions[index] = true
    let { instruction, value } = instructions[index]
    if (instruction === 'acc') {
      accumulator += value
      index++
    } else if (instruction === 'jmp') {
      index += value
    } else {
      index++
    }
  }
  console.log(`The accumulator's value before the infinite loop was ${accumulator}`)
}

function main2 () {
  let instructions = getInput()
  let accumulator
  let index = 0
  let swappedInstructionIndex = -1

  while (index < instructions.length) {
    let seenInstructions = {}
    accumulator = 0
    index = 0
    swappedInstructionIndex = instructions.findIndex(({ instruction }, i) => {
      return i > swappedInstructionIndex && ['jmp', 'nop'].includes(instruction)
    })

    while (!seenInstructions[index] && index < instructions.length) {
      seenInstructions[index] = true
      let { instruction, value } = instructions[index]
      if (index === swappedInstructionIndex) {
        if (instruction === 'jmp') {
          instruction = 'nop'
        } else if (instruction === 'nop') {
          instruction = 'jmp'
        }
      }

      if (instruction === 'acc') {
        accumulator += value
        index++
      } else if (instruction === 'jmp') {
        index += value
      } else {
        index++
      }
    }
  }
  console.log(`The accumulator's value after fixing the infinite loop is ${accumulator}`)
}

function getSwappedInstructionIndex (instructions, currentIndex) {
}

main()
main2()
