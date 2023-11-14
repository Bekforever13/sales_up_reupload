import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	tools: [],
}

export const { reducer, actions: reducerActions } = createSlice({
	name: 'tools',
	initialState,
	reducers: {
		fetchTools: (state, action) => {
			state.tools = action.payload
		},
	},
})

export const actions = {
  ...reducerActions
}