import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Pagination } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import ActionsRow from '../ActionsRow/ActionsRow'

const MainTable = ({ page, setPage, countUsers }) => {
	const orders = useSelector(state => state.orders.orders)

	const handleChangePage = event => {
		setPage(event)
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
					<TableHead>
						<TableRow>
							<TableCell>№</TableCell>
							<TableCell align='left'>ФИО</TableCell>
							<TableCell align='left'>Телефон</TableCell>
							<TableCell align='left'>Комментарий</TableCell>
							<TableCell align='left'>Название курса</TableCell>
							<TableCell align='left'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders &&
							orders.map(item => (
								<TableRow
									key={item.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component='th' scope='row'>
										{item.id}
									</TableCell>
									<TableCell align='left'>{item.lead_name}</TableCell>
									<TableCell align='left'>{item.lead_phone}</TableCell>
									<TableCell align='left'>{item.comment}</TableCell>
									<TableCell align='left'>{item.course_title}</TableCell>
									<TableCell align='left'>
										<ActionsRow order={item} />
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<div className='py-6'>
				<Pagination
					total={countUsers}
					defaultPageSize={15}
					showSizeChanger={false}
					page={page}
					onChange={handleChangePage}
				/>
			</div>
		</>
	)
}

export default MainTable
