import { expect } from 'chai'
import ColorPicker from '../../src/models/color_picker'

describe('ColorPicker', () => {

  it('Return an array of hex codes', () => {
      const testArray = [1, 2, 4]
      const results = ColorPicker(testArray)
      expect(results.length).to.eq(3)
      expect(results[0].length).to.eq(7)
  })

})