import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setAutoFreeze } from 'immer'
import { courseModel } from './courseModel'
import { ordersModel } from './ordersModel'
import { botsModel } from './settingsModel/bot'
import { statusesModel } from './settingsModel/statuses'
import { sourceModel } from './sourceModel'
import { toolsModel } from './toolsModel'
import { usersModel } from './usersModel'
import { chartsModel } from './chartsModel'

const rootReducer = combineReducers({
	users: usersModel.reducer,
	orders: ordersModel.reducer,
	source: sourceModel.reducer,
	tools: toolsModel.reducer,
	statuses: statusesModel.reducer,
	courses: courseModel.reducer,
	bots: botsModel.reducer,
	charts: chartsModel.reducer
})

const store = configureStore({
	reducer: rootReducer,
})
setAutoFreeze(false)

export default store
