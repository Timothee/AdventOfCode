const fs = require('fs')
const process = require('process')

function getInput () {
  let input
  try {
    input = fs.readFileSync('./2020/day4input.txt', 'utf8')
  } catch (e) {
    console.error('oops, no input file')
  }
  return input.split('\n\n').filter(Boolean).map(n => n.split('\n').join(' ')).map(p => {
    let fields = p.split(' ')
    return fields.map(f => f.split(':')).map(parts => ({
      field: parts[0],
      value: parts[1]
    }))
  })
}

function hasRequiredFields (passport) {
  let requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
  ]
  return requiredFields.every(f => passport.some(({ field }) => field === f))
}

function main () {
  let validPassports = getInput().filter(hasRequiredFields)
  console.log(`There are ${validPassports.length} valid passports.`)
}

function main2 () {
  let validPassportCounts = 0
  let passports = getInput().filter(hasRequiredFields)
  for (let passport of passports) {
    let valid = true
    for (let { field, value } of passport) {
      if (field === 'byr') {
        value = Number(value)
        if (value < 1920 || value > 2002) {
          valid = false
        }
      } else if (field === 'iyr') {
        value = Number(value)
        if (value < 2010 || value > 2020) {
          valid = false
        }
      } else if (field === 'eyr') {
        value = Number(value)
        if (value < 2020 || value > 2030) {
          valid = false
        }
      } else if (field === 'hgt') {
        let unit = value.slice(-2)
        value = Number(value.slice(0, -2))
        if (unit !== 'cm' && unit !== 'in') {
          valid = false
        } else if (unit === 'cm') {
          if (value < 150 || value > 193) {
            valid = false
          }
        } else {
          if (value < 59 || value > 76) {
            valid = false
          }
        }
      } else if (field === 'hcl') {
        if (!value.match(/^#[0-9a-f]{6}$/)) {
          valid = false
        }
      } else if (field === 'ecl') {
        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)) {
          valid = false
        }
      } else if (field === 'pid') {
        if (!value.match(/^[0-9]{9}$/)) {
          valid = false
        }
      }
    }
    if (valid) {
      validPassportCounts++
    }
  }
  console.log(`There are ${validPassportCounts} valid passports with stricter validation rules.`)
}

main()
main2()
