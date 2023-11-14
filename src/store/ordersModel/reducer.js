import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	orders: [],
	render: 0,
}

export const { reducer, actions: reducerActions } = createSlice({
	name: 'orders',
	initialState,
	reducers: {
		fetchOrders: (state, action) => {
			state.orders = action.payload
		},
		changeStatus: (state, action) => {
			state.users = action.payload
		},
		commentOrder: state => {
			state.render = state.render + 1
		},
	},
})
export const actions = {
	...reducerActions,
}
