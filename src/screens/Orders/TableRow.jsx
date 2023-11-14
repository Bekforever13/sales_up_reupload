import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosBasic from '../../services/axios/axiosBasic'
import { usersModel } from '../../store/usersModel'

const CustomTableRow = ({ user }) => {
	const [status, setStatus] = useState('')
	const dispath = useDispatch()
	const [allStatuses, setAllStatuses] = useState([])
	const stateUsers = useSelector(state => state.users.users)

	const handleChange = event => {
		setStatus(event.target.value)
		const newStatus = event.target.value
		const updatedUsers = stateUsers.map(stateUser => {
			if (stateUser.id === user.id) {
				return { ...stateUser, status: newStatus }
			}
			return stateUser
		})

		dispath(usersModel.actions.changeStatus(updatedUsers))
	}

	useEffect(() => {
		axiosBasic.get('/statuses').then(res => setAllStatuses(res.data.data))
	}, [])

	return (
		<TableCell align='right'>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<FormControl>
					<InputLabel id='demo-simple-select-label'>{status}</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={status}
						label='status'
						onChange={handleChange}
					>
						{allStatuses.map(s => (
							<MenuItem key={s.id} value={s.name}>
								{s.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</TableCell>
	)
}

export default CustomTableRow
