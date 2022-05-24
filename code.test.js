// const getResult = (input) => typeof input


function getResult(original, given) {
  const path = []
  const founds = []

  function recur(input) {
    return Object.keys(input).forEach(key => {
      path.push(key)
      if(typeof input[key] === 'object') return recur(input[key])
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
  it('should succesfully test', () => {
    const input = {dos: 2, uno: 1, tres: {miel: false}}

    const result = getResult(input, 'miel')

    expect(result).toEqual(['tres.miel'])
  })
})
