export class Serie {
  /**
    * A class representing a series of values
    * This class is an Array with usefull extra methods and properties
    */
     name:?string
     type: string
     content: string
     containString: boolean
     containBool: boolean
     containNumber: boolean
     data: | $ReadOnlyArray<number>
           | $ReadOnlyArray<string>
           | $ReadOnlyArray<boolean>

     constructor (inputArray: Array<number> | Array <string> | Array <boolean>,
       inputName?:string = '') {
       this.name = inputName
       const iMax = inputArray.length
       let i = 0
       // the rest of the constructor is inputArray content checking
       let numberData: Array<number> = []
       let stringData: Array<number> = []
       let booleanData: Array<boolean> = []
       for (; i < iMax; i++) {
         if ((typeof inputArray[i]) === 'number' |
             (inputArray[i] === undefined) |
             (inputArray[i] === null)) {
           numberData.push(inputArray[i])
         }
         if ((typeof inputArray[i]) === 'string' |
             (inputArray[i] === undefined) |
             (inputArray[i] === null) |
             (inputArray[i] === '')) {
           stringData.push(inputArray[i])
         }
         if ((typeof inputArray[i]) === 'boolean' |
         (inputArray[i] === undefined) |
         (inputArray[i] === null)) {
           booleanData.push(inputArray[i])
         } else if ((typeof inputArray[i] === 'object')) {
           throw new Error("Wrong data type for Serie's input")
         }
       }
       let numberLength = numberData.length
       let stringLength = stringData.length
       let booleanLength = booleanData.length
       let argMax = [numberLength, stringLength, booleanLength].map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]

       if (argMax === 2) {
         this.containBool = true
         this.containString = false
         this.containNumber = false
         this.data = booleanData
         for (let elt of stringData) {
           if (typeof elt === 'string') {
             throw new Error("Serie's input contains more than one type")
           }
         }
         for (let elt of numberData) {
           if (typeof elt === 'number') {
             throw new Error("Serie's input contains more than one type")
           }
         }
       }
       if (argMax === 1) {
         this.containBool = false
         this.containString = true
         this.containNumber = false
         this.data = stringData
         for (let elt of booleanData) {
           if (typeof elt === 'boolean') {
             throw new Error("Serie's input contains more than one type")
           }
         }
         for (let elt of numberData) {
           if (typeof elt === 'number') {
             throw new Error("Serie's input contains more than one type")
           }
         }
       }
       if (argMax === 0) {
         this.containBool = false
         this.containString = false
         this.containNumber = true
         this.data = numberData
         for (let elt of booleanData) {
           if (typeof elt === 'boolean') {
             throw new Error("Serie's input contains more than one type")
           }
         }
         for (let elt of stringData) {
           if (typeof elt === 'string') {
             throw new Error("Serie's input contains more than one type")
           }
         }
       }
     }
  // methods
     getIndex (val : string | number | boolean) : Array<number> {
       /**
       * Return the indexes at which val is present
       */
       const indexes = []
       let i = 0
       const iMax = this.length // optimize loop
       for (; i < iMax; i++) {
         if (this.data[i] === val) {
           indexes.push(i)
         }
       }
       return indexes
     }
     getValue (indexArray : Array<number>) : Array<number>|Array<string>|Array<boolean> {
       /**
        * Return the values present at each index of indexArray
        */

       let values : Array<number|string|boolean> = []
       let i = 0
       const iMax = this.length
       for (; i < iMax; i++) {
         for (const j of indexArray) {
           if (i === j) {
             values.push(this.data[i])
           }
         }
       }
       return values
     }
     countValue (value : number | string | boolean) : number {
       /**
       * Return the number of occurence of value in array
       */
       let count = 0
       const iMax = this.length // optimize loop
       let i = 0
       for (; i < iMax; i++) {
         if (this.data[i] === value) {
           count += 1
         }
       }
       return count
     }
     freqValue (value: number | string | boolean) : number {
       /**
       * Return the frequency of a given value in array
       */
       return (this.countValue(value) / this.length)
     }
     fillNull (method: string = 'maxFreq') : Serie {
       /**
       * Complete uncomplete values in Serie and return a completed Serie
       * following the given method : 'median', 'mean', 'maxFreq'
       */
       if (this.isComplete === false) {
         // precomputing maxOcc
         let validValue = this.validValue
         let uniqValidValue = new Serie(validValue.uniqValue)
         let freq = []
         for (let val of uniqValidValue.data) {
           freq.push(this.freqValue(val))
         }
         let freqSerie = new Serie(freq)
         let maxOcc = uniqValidValue.getValue(freqSerie.argMax)[0]

         if (this.containNumber) {
           const iMax = this.length
           let i = 0
           let newData = []
           // precomputing mean and median
           let mean = validValue.mean
           let median = validValue.median

           for (; i < iMax; i++) {
             if (this.data[i] === undefined | this.data[i] === null) {
               if (method === 'maxFreq') {
                 newData.push(maxOcc)
               }
               if (method === 'mean') {
                 newData.push(mean)
               }
               if (method === 'median') {
                 newData.push(median)
               }
             } else {
               newData.push(this.data[i])
             }
           }
           return new Serie(newData)
         }
         if (this.containString |
             this.containBool) {
           const iMax = this.length
           let i = 0
           let newData = []
           for (; i < iMax; i++) {
             if (this.data[i] === undefined |
                 this.data[i] === null |
                 this.data[i] === '') {
               newData.push(maxOcc)
             } else {
               newData.push(this.data[i])
             }
           }
           return new Serie(newData)
         }
       } else {
         return this
       }
     }
     // properties
     get length () : number {
       return this.data.length
     }
     get type () : string {
       return 'Serie'
     }
     get content () : string {
       if (this.containBool) {
         return 'boolean'
       }
       if (this.containNumber) {
         return 'number'
       }
       if (this.containString) {
         return 'string'
       }
     }
     get uniqValue () : Array<string>|Array<number>|Array<boolean> {
       const uValues = new Set(this.data)
       return [...uValues]
     }
     get max () : number {
       if (this.containNumber) {
         return Math.max.apply(null, this.data)
       } else {
         throw new Error('max works only on Serie that contains number')
       }
     }
     get argMax () : number {
       if (this.containNumber) {
         return this.getIndex(this.max)
       } else {
         throw new Error('ArgMax works only on Serie that contains number')
       }
     }
     get min () : number {
       if (this.containNumber) {
         return Math.min.apply(null, this.data)
       } else {
         throw new Error('min works only on Serie that contains number')
       }
     }
     get argMin () : number {
       if (this.containNumber) {
         return this.getIndex(this.min)
       } else {
         throw new Error('argMin works only on Serie that contains number')
       }
     }
     get mean () : number {
       if (this.containNumber) {
         const iMax = this.length
         let sum = 0
         let numValid = 0
         let i = 0
         for (; i < iMax; i++) {
           if (this.data[i]) {
             numValid += 1
             sum += this.data[i]
           }
         }
         return sum / numValid
       } else {
         throw new Error('mean works only on Serie that contains number')
       }
     }
     get median () : number {
       if (this.containNumber) {
         let values = this.validValue.data
         values.sort((a, b) => a - b)
         let half = Math.floor(values.length / 2)
         if (values.length % 2) {
           return values[half]
         } else {
           return (values[half - 1] + values[half]) / 2.0
         }
       } else {
         throw new Error('median works only on Serie that contains number')
       }
     }
     get isComplete () : boolean {
       let completion = true
       const iMax = this.length

       if (this.containBool || this.containNumber) {
         let i = 0
         for (; i < iMax; i++) {
           if (this.data[i] === undefined || this.data[i] === null) {
             completion = false
           }
         }
       }
       if (this.containString) {
         let i = 0
         for (; i < iMax; i++) {
           if (this.data[i] === undefined ||
             this.data[i] === null ||
             this.data[i] === '') {
             completion = false
           }
         }
       }
       return completion
     }
     get validValue () : Serie {
       if (this.isComplete) {
         return this
       } else {
         const iMax = this.length
         let validValue = []
         if (this.containNumber) {
           let i = 0
           for (; i < iMax; i++) {
             if (this.data[i] ||
                this.data[i] === 0) {
               validValue.push(this.data[i])
             }
           }
         }
         if (this.containBool) {
           let i = 0
           for (; i < iMax; i++) {
             if (this.data[i] ||
                this.data[i] === false) {
               validValue.push(this.data[i])
             }
           }
         }
         if (this.containString) {
           let i = 0
           for (; i < iMax; i++) {
             if (this.data[i]) {
               validValue.push(this.data[i])
             }
           }
         }
         return new Serie(validValue)
       }
     }
}
