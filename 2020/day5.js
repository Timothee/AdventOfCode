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
  return input.split('\n').filter(Boolean).map(seat => {
    let row = parseInt(seat.slice(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2)
    let column = parseInt(seat.slice(7).replace(/L/g, '0').replace(/R/g, '1'), 2)
    let seatId = row * 8 + column
    return {
      row,
      column,
      seatId
    }
  })
}

function main () {
  let seats = getInput()
  let maxId = Math.max(...seats.map(s => s.seatId))
  console.log(`The maximum seat ID is ${maxId}.`)
}

function main2 () {
  let seats = getInput()
  seats.sort((a, b) => a.seatId - b.seatId)
  for (let i = 0; i < seats.length - 1; i++) { if (seats[i].seatId !== seats[i + 1].seatId - 1) {
      console.log(`My seat ID is ${seats[i].seatId + 1}.`)
      break
    }
  }
}

main()
main2()
