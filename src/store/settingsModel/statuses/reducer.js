import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	statuses: [],
}

export const { reducer, actions: reducerActions } = createSlice({
	name: 'statuses',
	initialState,
	reducers: {
		fetchStatuses: (state, action) => {
			state.statuses = action.payload
		},
		removeStatus: (state, action) => {
			state.statuses = state.statuses.filter(
				status => status.id !== action.payload
			)
		},
	},
})

export const actions = {
	...reducerActions,
}
