import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosBasic from '../../../services/axios/axiosBasic'
import ActionsRow from '../ActionsRow/ActionsRow'
import CustomTableRow from '../TableRow'

const MainTable = ({ page, setPage, countUsers }) => {
	const [allStatuses, setAllStatuses] = useState([])
	const users = useSelector(state => state.users.users)

	useEffect(() => {
		axiosBasic
			.get('/statuses')
			.then(res => {
				setAllStatuses(res.data.data)
			})
	}, [])

	const handleChangePage = event => {
		setPage(event)
	}

	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
					<TableHead>
						<TableRow>
							<TableCell>№</TableCell>
							<TableCell align='left'>ФИО</TableCell>
							<TableCell align='left'>Телефон</TableCell>
							<TableCell align='left'>Статус</TableCell>
							<TableCell align='left'>Комментарий</TableCell>
							<TableCell align='left'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users &&
							users.map(item => (
								<TableRow
									key={item.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component='th' scope='row'>
										{item.id}
									</TableCell>
									<TableCell align='left'>{item.name}</TableCell>
									<TableCell align='left'>{item.phone}</TableCell>
									<CustomTableRow allStatuses={allStatuses} user={item} />
									<TableCell align='left'>{item.comment}</TableCell>
									<TableCell align='left'>
										<ActionsRow user={item} />
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<div className='py-6'>
				<Pagination
					total={countUsers}
					page={page}
					showSizeChanger={false}
					defaultPageSize={15}
					onChange={handleChangePage}
				/>
			</div>
		</div>
	)
}

export default MainTable
