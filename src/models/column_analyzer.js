import _ from "lodash";

export class ColumnAnalyzer {

	static select(ary) {
		if (_.uniq(ary).length < 6) {
			return "piechart"
		} else if (this.isNumbers(ary)) {
			return "histogram"
		}
	}

	static isNumbers(ary) {
		return ary.every(e => (!isNaN(e) && typeof(e) != typeof(true)))
	}

}
