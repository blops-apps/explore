import { expect } from 'chai'
import { Serie } from '../../src/models/serie'
describe('Serie', () => {
  const stringArray = ['m', 'f', 'f', 'f', 'm', 'm', 'm', 'm', 'f', 'f', 'f', 'f', 'm', 'm', 'f', 'f', 'm', 'm']
  const numberArray = [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1]
  const booleanArray = [false, true, true, true, false, false, false, false, true, true, true, true, false]
  const mixedTypeArray = [1, 2, 3, 4, 5, true, false, 'toto', 'hi']
  const wrongTypeArray = [[1, 2], { 'key': 'value' }, [[[1]]]]
  const stringSerie = new Serie(stringArray, 'string')
  const numberSerie = new Serie(numberArray, 'number')
  const booleanSerie = new Serie(booleanArray, 'boolean')
  const uncompleteString = new Serie(['m', 'f', '', null, undefined, 'm'])
  const uncompleteNumber = new Serie([1, 1, 0, undefined, 0, 1, null])
  const uncompleteBoolean = new Serie([true, true, null, false, undefined, true])

  it('Should create a Serie from an Array of number', () => {
    expect(numberSerie.length).to.be.at.least(1)
  })
  it('Should create a Serie from an Array of string', () => {
    expect(stringSerie.length).to.be.at.least(1)
  })
  it('Should create a Serie from an Array of boolean', () => {
    expect(booleanSerie.length).to.be.at.least(1)
  })
  it('Should create a Serie without name', () => {
    const noName = new Serie(numberArray)
    expect(noName.length).to.be.at.least(1)
    expect(noName.name).to.be.equal('')
  })
  it('Should reject Serie creation from input of mixed type', () => {
    try {
      new Serie(mixedTypeArray, 'mixed type')
    } catch (error) {
      expect(error.message).to.be.equal("Serie's input contains more than one type")
    }
  })
  it('Should reject Serie creation from input of wrong type', () => {
    try {
      new Serie(wrongTypeArray, 'wrong type')
    } catch (error) {
      expect(error.message).to.be.equal("Wrong data type for Serie's input")
    }
  })
  describe('getIndex', () => {
    it('Should get the indexes of a number value', () => {
      expect(numberSerie.getIndex(0)).to.deep.equal([0, 4, 5, 6, 7, 12, 13, 14, 16])
    })
    it('Should get the indexes of a string value', () => {
      expect(stringSerie.getIndex('m')).to.deep.equal([0, 4, 5, 6, 7, 12, 13, 16, 17])
    })
    it('Should get the indexes of a boolean value', () => {
      expect(booleanSerie.getIndex(true)).to.deep.equal([1, 2, 3, 8, 9, 10, 11])
    })
  })
  describe('getValue', () => {
    it('Should get values from a list of indexes', () => {
      expect(booleanSerie.getValue([0, 1, 2])).to.deep.equal([false, true, true])
      expect(numberSerie.getValue([0, 1, 2])).to.deep.equal([0, 1, 1])
      expect(stringSerie.getValue([0, 1, 2])).to.deep.equal(['m', 'f', 'f'])
    })
  })
  describe('countValue', () => {
    it('Should count values in an array of number', () => {
      expect(numberSerie.countValue(0)).to.be.equal(9)
    })
    it('Should count values in an array of string', () => {
      expect(stringSerie.countValue('m')).to.be.equal(9)
    })
    it('Should count values in an array of boolean', () => {
      expect(booleanSerie.countValue(true)).to.be.equal(7)
    })
  })
  describe('freqValue', () => {
    it('Should give the occurency frequence of a given value in an array of number', () => {
      expect(numberSerie.freqValue(0)).to.be.equal(0.5)
      expect(numberSerie.freqValue(1)).to.be.equal(0.5)
    })
    it('Should give the occurency frequence of a given value in an array of string', () => {
      expect(stringSerie.freqValue('m')).to.be.equal(0.5)
      expect(stringSerie.freqValue('f')).to.be.equal(0.5)
    })
    it('Should give the occurency frequence of a given value in an array of boolean', () => {
      expect(booleanSerie.freqValue(true)).to.be.equal(0.5384615384615384)
      expect(booleanSerie.freqValue(false)).to.be.equal(0.46153846153846156)
    })
  })
  describe('fillNull', () => {
    it('Should complete null values in a Serie of number', () => {
      expect(uncompleteNumber.fillNull().data).to.deep.equal([1, 1, 0, 1, 0, 1, 1])
    })
    it('Should complete null values in a Serie of string', () => {
      expect(uncompleteString.fillNull().data).to.deep.equal(['m', 'f', 'm', 'm', 'm', 'm'])
    })
    it('Should complete null values in a Serie of boolean', () => {
      expect(uncompleteBoolean.fillNull().data).to.deep.equal([true, true, true, false, true, true])
    })
  })
  describe('length', () => {
    it('Should return the length of a Serie of number', () => {
      expect(numberSerie.length).to.be.equal(18)
    })
    it('Should return the length of a Serie of string', () => {
      expect(stringSerie.length).to.be.equal(18)
    })
    it('Should return the length of a Serie of boolean', () => {
      expect(booleanSerie.length).to.be.equal(13)
    })
  })
  describe('type', () => {
    it('Should return the type of a Serie, whatever it contains', () => {
      expect(numberSerie.type).to.be.equal('Serie')
      expect(stringSerie.type).to.be.equal('Serie')
      expect(booleanSerie.type).to.be.equal('Serie')
    })
  })
  describe('content', () => {
    it("Should return the content's type of a Serie, whatever it contains", () => {
      expect(numberSerie.content).to.be.equal('number')
      expect(stringSerie.content).to.be.equal('string')
      expect(booleanSerie.content).to.be.equal('boolean')
    })
  })
  describe('containBool', () => {
    it('Should return true for a Serie that contains boolean, false otherwise', () => {
      expect(booleanSerie.containBool).to.be.true
      expect(numberSerie.containBool).to.be.false
      expect(stringSerie.containBool).to.be.false
    })
  })
  describe('containString', () => {
    it('Should return true for a Serie that contains string, false otherwise', () => {
      expect(booleanSerie.containString).to.be.false
      expect(numberSerie.containString).to.be.false
      expect(stringSerie.containString).to.be.true
    })
  })
  describe('containNumber', () => {
    it('Should return true for a Serie that contains number, false otherwise', () => {
      expect(booleanSerie.containNumber).to.be.false
      expect(numberSerie.containNumber).to.be.true
      expect(stringSerie.containNumber).to.be.false
    })
  })
  describe('uniqValue', () => {
    it('Should return unique values in the Serie', () => {
      expect(booleanSerie.uniqValue).to.contain(true, false)
      expect(numberSerie.uniqValue).to.contain(0, 1)
      expect(stringSerie.uniqValue).to.contain('m', 'f')
    })
  })
  describe('max', () => {
    it('Should return the Max of an array of number', () => {
      expect(numberSerie.max).to.be.equal(1)
    })
  })
  describe('min', () => {
    it('Should return the Min of an array of number', () => {
      expect(numberSerie.min).to.be.equal(0)
    })
  })
  describe('argMax', () => {
    it('Should return the argument of the Max of an array of number', () => {
      expect(numberSerie.argMax).to.deep.equal([1, 2, 3, 8, 9, 10, 11, 15, 17])
    })
  })
  describe('argMin', () => {
    it('Should return the Min of an array of number', () => {
      expect(numberSerie.argMin).to.deep.equal([0, 4, 5, 6, 7, 12, 13, 14, 16])
    })
  })
  describe('mean', () => {
    it('Should return the Mean of an array of number', () => {
      let numberArr = [1, 4, 6, 9, 12, 15]
      let serie = new Serie(numberArr)
      expect(serie.mean).to.be.equal(7.833333333333333)
      expect(numberSerie.mean).to.be.equal(1)
    })
  })
  describe('median', () => {
    it('Should return the Median of an array of number', () => {
      expect(numberSerie.median).to.be.equal(0.5)
    })
  })
  describe('isComplete', () => {
    it('Should return false for uncomplete array', () => {
      expect(uncompleteBoolean.isComplete).to.be.false
      expect(uncompleteNumber.isComplete).to.be.false
      expect(uncompleteBoolean.isComplete).to.be.false
    })
    it('Should return true for complete array', () => {
      expect(booleanSerie.isComplete).to.be.true
      expect(numberSerie.isComplete).to.be.true
      expect(stringSerie.isComplete).to.be.true
    })
  })
  describe('validValue', () => {
    it('Should find the valid values (non Null) in a number Serie', () => {
      expect(uncompleteNumber.validValue.data).to.deep.equal([1, 1, 0, 0, 1])
    })
    it('Should find the valid values (non Null) in a string Serie', () => {
      expect(uncompleteString.validValue.data).to.deep.equal(['m', 'f', 'm'])
    })
    it('Should find the valid values (non Null) in a boolean Serie', () => {
      expect(uncompleteBoolean.validValue.data).to.deep.equal([true, true, false, true])
    })
  })
})
