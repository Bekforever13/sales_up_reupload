import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	source: [],
}

export const { reducer, actions: reducerActions } = createSlice({
	name: 'source',
	initialState,
	reducers: {
		fetchSource: (state, action) => {
			state.source = action.payload
		},
		addSource: (state, action) => {
			state.source.push(action.payload)
		},
		removeSource: (state, action) => {
			state.source = state.source.filter(source => source.id !== action.payload)
		},
		editSource: (state, action) => {
			state.source.map(el => {
				if (el.id === action.payload.id) {
					el.name = action.payload.name
					el.type = action.payload.type
				}
			})
		},
	},
})

export const actions = {
	...reducerActions,
}
