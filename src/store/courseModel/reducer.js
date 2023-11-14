import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	courses: [],
}

export const { reducer, actions: reducerActions } = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		fetchCourses: (state, action) => {
			state.courses = action.payload
		},
		addCourse: (state, action) => {
			state.courses.push(action.payload)
		},
		removeCource: (state, action) => {
			state.courses = state.courses.filter(cource => cource.id !== action.payload)
		},
		editCource: (state, action) => {
			state.courses.map(el => {
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
