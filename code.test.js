// const getResult = (input) => typeof input


function getResult(original, given) {
  const path = []
  const founds = []

  function recur(input) {
    return Object.keys(input).forEach(key => {
      path.push(key)
      if(typeof input[key] === 'object') recur(input[key])
      if(key === given) {
        founds.push(path.join('.'))
      }
      path.pop(key)
    })
  }

  recur(original)

  return founds
}

describe('daily code problem', () => {
  test('deep 1', () => {
    const input = {dos: 2, uno: 1, tres: {miel: false}}

    const result = getResult(input, 'miel')

    expect(result).toEqual(['tres.miel'])
  })

  test('deep 2', () => {
    const input = {dos: 2, tres: {alpha: 'asd', beta: {miel: 'a'}}, uno: 1}

    const result = getResult(input, 'miel')

    expect(result).toEqual(['tres.beta.miel'])
  })

  test('multiple finds', () => {
    const input = {dos: 2, tres: {alpha: 'asd', beta: {miel: 'a'}}, uno: 1, miel: 'lol', sin: {miel: 'm'}}

    const result = getResult(input, 'miel')

    expect(result).toEqual(['tres.beta.miel', 'miel', 'sin.miel'])
  })

  test('multiple times', () => {
    const input = {miel: {miel: {miel: 'a'}}}

    const result = getResult(input, 'miel')

    expect(result).toEqual(['miel.miel.miel', 'miel.miel', 'miel'])
  })
})
