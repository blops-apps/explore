export class DataTable {

	constructor(csvLines) {
		this.dataLines = csvLines 
	}

	column(index) {
		return this.dataLines.map( line => line[index] )
	}

	histogram(index) {
		return this.constructor.histogram(this.column(index))
	}

	static histogram(ary) {
		let countValues = function (ary){
			return ary.reduce(function (acc, obj) {
				var key = obj;
				if(!acc[key]){
					acc[key] = 0;
				}
				acc[key] += 1;
				return acc;
			}, {})
		}
		let columnCount = countValues(ary)
		return {keys: Object.keys(columnCount), values: Object.values(columnCount)}
	}

}