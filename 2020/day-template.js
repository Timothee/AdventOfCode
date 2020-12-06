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
  return input.split('\n').filter(Boolean)
}

function main () {
}

function main2 () {
}

main()
main2()
