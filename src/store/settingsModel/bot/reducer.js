import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	bots: [],
	render: 0,
}

export const { reducer, actions: reducerActions } = createSlice({
	name: 'bots',
	initialState,
	reducers: {
		fetchBots: (state, action) => {
			state.bots = action.payload
		},
		removeBot: state => {
			state.bots = []
		},
		addBot: (state, action) => {
			state.bots.push(action.payload)
		},
		render: state => {
			state.render = state.render + 1
		},
	},
})

export const actions = {
	...reducerActions,
}
