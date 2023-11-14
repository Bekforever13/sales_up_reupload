import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import { message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosBasic from '../../services/axios/axiosBasic'

const CustomTableRow = ({ user, allStatuses }) => {
	const [status, setStatus] = useState(user?.status)
	const dispath = useDispatch()
	const stateUsers = useSelector(state => state.users.users)

	const handleChange = event => {
		setStatus(event.target.value)

		axiosBasic
			.put(
				`/leads/${user?.id}?status_id=${
					allStatuses.find(item => item?.name === event.target.value)?.id
				}`
			)
			.then(res => {
				message.success('User status updated!')
			})
	}

	return (
		<TableCell align='right'>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<FormControl>
					<InputLabel id='demo-simple-select-label'>{status}</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={status}
						label={status}
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
