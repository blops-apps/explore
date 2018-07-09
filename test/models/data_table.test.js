import { expect } from 'chai'
import { ColumnAnalyzer } from '../../src/models/column_analyzer'

describe('DataTable', () => {

  const discrete 	     = ['flower', 'table', 'parrot']
  const longDiscrete 	 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  const booleanNumbers   = [0, 1, 0, 1, 0, 1]
  const ints  			 = [0, 110, 3021]
  const longInts    	 = [0, 110, 302, 1010, 10101, 10101, 10100]
  const floats  		 = [0, 3.15, 3021]
  const booleans 	     = [false, true, true, false]
  const booleansWithText = [false, "true", true, false]

  it('Should detect is ary isNumbers', () => {
  	expect(ColumnAnalyzer.isNumbers(discrete)).to.be.false
	expect(ColumnAnalyzer.isNumbers(booleanNumbers)).to.be.true
	expect(ColumnAnalyzer.isNumbers(ints)).to.be.true
	expect(ColumnAnalyzer.isNumbers(floats)).to.be.true
	expect(ColumnAnalyzer.isNumbers(booleans)).to.be.false
	expect(ColumnAnalyzer.isNumbers(booleansWithText)).to.be.false
  })

  it('Should return the good analyzer', () => {
  	expect(ColumnAnalyzer.select(floats)).to.eq("piechart")
  	expect(ColumnAnalyzer.select(longInts)).to.eq("histogram")
  	expect(ColumnAnalyzer.select(longDiscrete)).to.be.undefined
  })

})