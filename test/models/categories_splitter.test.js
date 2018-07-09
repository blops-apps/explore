import { expect } from 'chai'
import { splitCategories, splitSortedArray, _ } from '../../src/models/categories_splitter'

describe('Categories', () => {

  const longInts    	 = [0, 110, 302, 1010, 10101, 10101, 10100]

  it('Should split array', () => {
      const testArray = [1, 2, 4, 10, 20, 30, 50, 60, 1000, 30000]
      const result = splitSortedArray(testArray, 3)
      expect(result.length).to.eq(4)
  })

  it('Should return categories', () => {
      const testArray = [1, 2, 4, 10, 20, 30, 50, 60, 1000, 30000]
      const result = splitCategories(testArray, 3)
      const lastResult = result[3]
      expect(result.length).to.eq(4)
      expect(lastResult.label).to.eq('30000-30000')
      expect(lastResult.data).to.deep.equal([30000])
  })

})