import Vue from 'vue'
import Vuex from 'vuex'
import {DataTable} from './data_table'
import CSVReader from './csv_reader'

Vue.use(Vuex)

const mutations = {
  setTableData (state, csv) {
    let ary = CSVReader.fileToArray(csv)
    state.tableData = new DataTable(ary)
  }
}

const actions = {
	setTableData(context, tableData){
		context.commit('setTableData', tableData)
	}
}

const state = {
  tableData: new DataTable([])
}

const getters = {
	histogram(state) {
    return function(index) {
      return state.tableData.histogram(index)      
    }
  }
}

export default new Vuex.Store({
  state,
  getters, 
  actions,
  mutations
})


