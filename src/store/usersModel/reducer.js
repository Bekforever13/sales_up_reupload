import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
	users: [],
}

export const { reducer, actions: reducerActions } = createSlice({
	name: 'users',
	initialState,
	reducers: {
		fetchUsers: (state, action) => {
			state.users = action.payload
		},
		changeStatus: (state, action) => {
			state.users = action.payload;	
		},
		addComment: (state, action) => {
			state.users.find(user => {
				if (user.id === action.payload.id) {
					user.comment = action.payload.comment
				}
			})
		}
	},
})
export const actions = {
	...reducerActions,
}
