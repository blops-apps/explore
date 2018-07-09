export class ColumnCategory {
	constructor(label, data) {
		this.label = label
		this.data = data
	}

	length() {
		return this.data.length
	}
}
