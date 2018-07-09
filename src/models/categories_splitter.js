import _ from "lodash";

import { ColumnCategory } from '../../src/models/column_category';

const arrayToCategory = (array) => {
	const min = _.min(array)
	const max = _.max(array)
	const label = `${min}-${max}`
	return new ColumnCategory(label, array);
}

const splitCategories = (array, approxCategoriesCount) => {
	const numerizedArray = _.sortBy(array.map(e => +e))
	const uniqValues = _.uniq(numerizedArray)
	const maxCategoriesCount = 20
	const splittedArray = splitSortedArray(
		numerizedArray, 
		Math.round(array.length / (approxCategoriesCount || maxCategoriesCount))
		)
	return splittedArray.map(e => arrayToCategory(e))
}

const splitSortedArray = (array, sliceSize) => {
	if (array.length == 0) {
		return []
	}
	if (array.length <= sliceSize) {
		return [array]
	}
	var i = 1
	while (array[sliceSize + i] === array[sliceSize]) {
		i++
	}
	const headAry = array.slice(0, sliceSize + i - 1)
	const tailAry = array.slice(sliceSize + i - 1)
	return [headAry].concat(splitSortedArray(tailAry, sliceSize))
}

module.exports = {
	splitCategories,
	splitSortedArray

}
