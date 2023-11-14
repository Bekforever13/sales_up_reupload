import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	statuses: [],
	courses: {},
}

export const { reducer, actions: reducerActions } = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		fetchStatuses: (state, { payload }) => {
			state.statuses = payload
		},
		fetchCourses: (state, { payload }) => {
			state.courses = payload
		},
	},
})

export const actions = {
	...reducerActions,
}
