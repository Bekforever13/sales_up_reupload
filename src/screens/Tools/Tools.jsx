import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Drawer, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosBasic from '../../services/axios/axiosBasic.js'
import { toolsModel } from '../../store/toolsModel/index.js'
import ActionsRow from './Actions/ActionsRow.jsx'
import './Tools.scss'

const Tools = ({ page, setPage, rowsPerPage, setRowsPerPage }) => {
	const dispatch = useDispatch()
	const tools = useSelector(state => state.tools.tools)
	const [open, setOpen] = useState(false)
	const [options, setOptions] = useState([])

	const navigate = useNavigate()
	// check
	const tokenToCheck = localStorage.getItem('token')
	useEffect(() => {
		axiosBasic
			.post('/auth/check', tokenToCheck)
			.catch(() => navigate('/auth', { replace: true }))
	}, [tokenToCheck])

	useEffect(() => {
		axiosBasic
			.get('/links')
			.then(res => dispatch(toolsModel.actions.fetchTools(res.data.data)))
	}, [])

	const showDrawer = () => {
		tools.map(item => {
			setOptions(prev => [
				...prev,
				{
					value: item.source_name,
					label: item.source_name,
				},
			])
		})
		setOpen(true)
	}
	const onClose = () => setOpen(false)

	return (
		<div className='flex flex-col p-5 gap-y-5'>
			<div>
				<Button onClick={showDrawer} variant='contained'>
					Добавить
				</Button>
				<Drawer placement='right' onClose={onClose} open={open}>
					<input
						className='w-full border-[1px] border-black py-2 px-4 rounded-md'
						placeholder='Цена...'
						type='text'
					/>
					<Select
						className='w-full rounded-md'
						placeholder='Выберите бота'
						optionFilterProp='children'
						filterOption={(input, option) =>
							(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
						}
						options={options}
					/>
					<Button variant='contained'>Добавить</Button>
				</Drawer>
			</div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
					<TableHead>
						<TableRow>
							<TableCell>№</TableCell>
							<TableCell align='left'>Источники</TableCell>
							<TableCell align='left'>Ссылка</TableCell>
							<TableCell align='left'>Кликнул</TableCell>
							<TableCell align='left'>Цена</TableCell>
							<TableCell align='left'>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tools &&
							tools.map(item => (
								<TableRow
									key={item.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component='th' scope='row'>
										{item.id}
									</TableCell>
									<TableCell align='left'>{item.source_name}</TableCell>
									<TableCell align='left'>{item.url}</TableCell>
									<TableCell align='left'>{item.clicked}</TableCell>
									<TableCell align='left'>{item.sum}</TableCell>
									<TableCell align='left'>
										<ActionsRow user={item} />
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Tools
