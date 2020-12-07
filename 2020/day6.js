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
  return input
    .split('\n\n')
    .filter(Boolean)
    .map(a => a
      .split('\n')
      .filter(Boolean)
      .map(l => l.split(''))
    )
}

function main () {
  let groups = getInput()
  let count = 0

  for (let group of groups) {
    let uniqueAnswers = new Set()
    for (let answer of group) {
      answer.forEach(l => uniqueAnswers.add(l))
    }
    count += uniqueAnswers.size
  }

  console.log(`The sum of unique answers per group is ${count}.`)
}


function main2 () {
  let groups = getInput()
  let count = 0

  for (let group of groups) {
    let answerCount = {}
    for (let answer of group) {
      for (let letter of answer) {
        if (answerCount[letter] === undefined) {
          answerCount[letter] = 1
        } else {
          answerCount[letter]++
        }
      }
    }

    for (let answer of Object.keys(answerCount)) {
      if (answerCount[answer] === group.length) {
        count++
      }
    }
  }
  console.log(`The sum of common answers per group is ${count}.`)
}

main()
main2()
