import { Spin } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import axiosBasic from '../../services/axios/axiosBasic'
import { usersModel } from '../../store/usersModel'
import Filter from './Filter/Filter'
import './Leads.scss'
import MainTable from './Tables/MainTable'
import { useNavigate } from 'react-router-dom'

const Leads = () => {
	const [loading, setLoading] = useState(false)
	const dispatch = useDispatch()
	const [page, setPage] = useState(0)
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const debouncedName = useDebounce(name, 500)
	const debouncedPhone = useDebounce(phone, 500)
	const [dateFrom, setDateFrom] = useState('')
	const [dateTo, setDateTo] = useState('')
	const [countUsers, setCountUsers] = useState(0)

	const navigate = useNavigate()
	// check
	const tokenToCheck = localStorage.getItem('token')
	useEffect(() => {
		axiosBasic
			.post('/auth/check', tokenToCheck)
			.catch(() => navigate('/auth', { replace: true }))
	}, [tokenToCheck])

	// table
	useEffect(() => {
		setLoading(true)
		axiosBasic
			.get(
				`/leads?page=${page}&name=${debouncedName}&phone=${debouncedPhone}&from=${dateFrom}&to=${dateTo}`
			)
			.then(res => {
				dispatch(usersModel.actions.fetchUsers(res.data.data))
				setCountUsers(res.data.total)
			})
			.catch(err => console.log(err))
			.finally(() => {
				setLoading(false)
			})
	}, [page, debouncedName, debouncedPhone, dateFrom, dateTo])

	return (
		<Spin spinning={loading}>
			<Filter
				name={name}
				setName={setName}
				phone={phone}
				setPhone={setPhone}
				setDateFrom={setDateFrom}
				dateFrom={dateFrom}
				dateTo={dateTo}
				setDateTo={setDateTo}
			/>
			<MainTable countUsers={countUsers} page={page} setPage={setPage} />
		</Spin>
	)
}

export default Leads
