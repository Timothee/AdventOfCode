const fs = require('fs')
const process = require('process')

function getInput () {
  let input
  try {
    input = fs.readFileSync('./2020/day2input.txt', 'utf8')
  } catch (e) {
    console.error('oops, no input file')
  }
  return input.split('\n').filter(Boolean).map(line => {
    let parts = line.split(' ')
    return {
      min: Number(parts[0].split('-')[0]),
      max: Number(parts[0].split('-')[1]),
      letter: parts[1].slice(0, 1),
      password: parts[2]
    }
  })
}

function main () {
  let validPasswordCount = 0

  for (let { min, max, letter, password } of getInput()) {
    let countOfLetterInPassword = [...password.matchAll(new RegExp(`${letter}`, 'g'))].length
    if (countOfLetterInPassword >= min && countOfLetterInPassword <= max) {
      validPasswordCount++
    }
  }

  console.log(`There are ${validPasswordCount} valid passwords.`)
}

function main2 () {
  let validPasswordCount = 0

  for (let { min, max, letter, password } of getInput()) {
    let minMatching = password[min - 1] == letter
    let maxMatching = password[max - 1] == letter
    if (minMatching ^ maxMatching) {
      validPasswordCount++
    }
  }

  console.log(`There are ${validPasswordCount} valid passwords with the correct password policy.`)
}

main()
main2()
