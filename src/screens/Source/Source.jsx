import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Drawer, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosBasic from '../../services/axios/axiosBasic'
import { sourceModel } from '../../store/sourceModel'
import Actions from './Actions/Actions'
import './Source.scss'

const Source = () => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const [page, setPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [open, setOpen] = useState(false)
	const sel = useSelector(state => state.source.source)
	const [newSource, setNewSource] = useState({
		name: '',
		type: '',
	})
	const [options, setOptions] = useState([
		{
			value: 'Telegram Bot',
			label: 'Telegram Bot',
		},
		{
			value: 'Web',
			label: 'Web',
		},
	])
	const srcs = useSelector(store => store.source.source)

	const navigate = useNavigate()
	// // check
	const tokenToCheck = localStorage.getItem('token')
	useEffect(() => {
		axiosBasic
			.post('/auth/check', tokenToCheck)
			.catch(() => navigate('/auth', { replace: true }))
	}, [tokenToCheck])

	//table
	useEffect(() => {
		setLoading(true)
		axiosBasic
			.get(`/sources`)
			.then(res => {
				dispatch(sourceModel.actions.fetchSource(res.data.data))
			})
			.catch(err => console.log(err))
			.finally(() => {
				setLoading(false)
			})
	}, [srcs.length])

	const showDrawer = () => {
		setOpen(true)
	}
	const onClose = () => {
		setOpen(false)
	}
	const onSelect = e => setNewSource({ ...newSource, type: e })

	const onSubmit = () => {
		setLoading(true)
		dispatch(sourceModel.actions.addSource(newSource))
		axiosBasic.post('/sources', newSource).finally(() => setLoading(false))
		setOpen(false)
		setNewSource({
			name: '',
			type: '',
		})
	}

	return (
		<Spin spinning={loading}>
			<div className='flex flex-col p-5 gap-y-5'>
				<div>
					<Button onClick={showDrawer} variant='contained'>
						Добавить
					</Button>
					<Drawer placement='right' onClose={onClose} open={open}>
						<input
							className='w-full border-[1px] border-black py-2 px-4 rounded-md'
							placeholder='Название...'
							value={newSource.name}
							onChange={e =>
								setNewSource({ ...newSource, name: e.target.value })
							}
							type='text'
						/>
						<Select
							className='w-full rounded-md'
							placeholder='Выберите'
							optionFilterProp='children'
							filterOption={(input, option) =>
								(option?.label ?? '')
									.toLowerCase()
									.includes(input.toLowerCase())
							}
							onChange={onSelect}
							options={options}
						/>
						<Button onClick={onSubmit} variant='contained'>
							Добавить
						</Button>
					</Drawer>
				</div>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 500 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>№</TableCell>
								<TableCell>Название</TableCell>
								<TableCell>Тип</TableCell>
								<TableCell>Действия</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{srcs.map(row => (
								<TableRow
									key={row.name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component='th' scope='row'>
										{row.id}
									</TableCell>
									<TableCell>{row.name}</TableCell>
									<TableCell>{row.type}</TableCell>
									<TableCell>
										<Actions source={row} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Spin>
	)
}

export default Source
