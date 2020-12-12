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
    .split('\n')
    .filter(Boolean)
    .map(line => {
      let parts = line.slice(0, -1).split(' contain ').filter(Boolean)
      let content
      if (parts[1] == 'no other bags') {
        content = []
      } else {
        content = parts[1].split(', ').filter(Boolean)
          .map(baggage => {
            let match = baggage.match(/(\d+) (.*) bags?/)
            return {
              count: match[1],
              description: match[2]
            }
          })
      }

      return {
        container: parts[0].replace(' bags', ''),
        content
      }
    })
}

function main () {
  let myBag = 'shiny gold'
  let bags = getInput()

  let validBags = {}
  let bagsToLookFor = [ myBag ]
  while (bagsToLookFor.length) {
    bagsToLookFor = bags
      .filter(bag =>
        bag.content.some(b =>
          bagsToLookFor.includes(b.description)))
      .map(bag => bag.container)
    bagsToLookFor.forEach(color => validBags[color] = true)
  }

  console.log(`There are ${Object.keys(validBags).length} bag colors that can eventually contain at least one ${myBag} bag.`)
}

function main2 () {
  let myBag = 'shiny gold'
  let bags = getInput()
  console.log(`There are ${howManyBagsInThatBag(bags, myBag)} bags in a ${myBag} bag`)
}

function howManyBagsInThatBag (bags, bagName) {
  let thatBag = bags.find(b => b.container === bagName)
  return thatBag.content
    .map(bag => bag.count * (1 + howManyBagsInThatBag(bags, bag.description)))
    .reduce((a, b) => a + b, 0)
}

main()
main2()
