import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Drawer, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosBasic from '../../services/axios/axiosBasic'
import { courseModel } from '../../store/courseModel'
import ActionsTable from './ActionsTable/ActionsTable'
import './Courses.scss'

const Courses = () => {
	const [open, setOpen] = useState(false)
	const [isEdited, setIsEdited] = useState(0)
	const [loading, setLoading] = useState(false)
	const [newCourse, setNewCourse] = useState({
		title: '',
		description: '',
		price: '',
	})
	const allCourses = useSelector(state => state.courses.courses)
	const dispatch = useDispatch()

	const navigate = useNavigate()
	// check
	const tokenToCheck = localStorage.getItem('token')
	useEffect(() => {
		axiosBasic
			.post('/auth/check', tokenToCheck)
			.catch(() => navigate('/auth', { replace: true }))
	}, [tokenToCheck])

	useEffect(() => {
		axiosBasic.get('/courses').then(res => {
			dispatch(courseModel.actions.fetchCourses(res.data.data))
		})
	}, [allCourses.length, isEdited])

	const showDrawer = () => {
		setOpen(true)
	}
	const onClose = () => {
		setOpen(false)
	}

	const onSubmit = () => {
		setLoading(true)
		dispatch(courseModel.actions.addCourse(newCourse))
		axiosBasic
			.post('/courses', newCourse)
			.then(res => console.log(res))
			.finally(() => setLoading(false))
		setOpen(false)
		setNewCourse({
			title: '',
			description: '',
			price: '',
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
							type='text'
							value={newCourse.title}
							onChange={e =>
								setNewCourse({ ...newCourse, title: e.target.value })
							}
						/>
						<input
							className='w-full border-[1px] border-black py-2 px-4 rounded-md'
							placeholder='Цена...'
							type='text'
							value={newCourse.price}
							onChange={e =>
								setNewCourse({ ...newCourse, price: e.target.value })
							}
						/>
						<input
							className='w-full border-[1px] border-black py-2 px-4 rounded-md'
							placeholder='Описание...'
							type='text'
							value={newCourse.description}
							onChange={e =>
								setNewCourse({ ...newCourse, description: e.target.value })
							}
						/>
						<Button onClick={onSubmit} variant='contained'>
							Добавить
						</Button>
					</Drawer>
				</div>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>№</TableCell>
								<TableCell>Название курса</TableCell>
								<TableCell>Описание</TableCell>
								<TableCell>Цена</TableCell>
								<TableCell>Кликнул</TableCell>
								<TableCell>Действия</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{allCourses.map(row => (
								<TableRow
									key={row.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component='th' scope='row'>
										{row.id}
									</TableCell>
									<TableCell>{row.title}</TableCell>
									<TableCell>{row.description}</TableCell>
									<TableCell>{row.price}</TableCell>
									<TableCell>{row.clicked}</TableCell>
									<TableCell>
										<ActionsTable
											isEdited={isEdited}
											setIsEdited={setIsEdited}
											course={row}
										/>
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

export default Courses
