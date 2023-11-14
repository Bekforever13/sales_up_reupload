import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosBasic from '../../services/axios/axiosBasic'
import { botsModel } from '../../store/settingsModel/bot'
import { statusesModel } from '../../store/settingsModel/statuses'
import './Settings.scss'
import Bot from './bot/Bot'
import Create from './bot/create/Create'
import Status from './statuses/Status.jsx'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
	const dispatch = useDispatch()
	const [renderStatus, setRenderStatus] = useState(0)
	const bot = useSelector(state => state.bots.bots)
	const renderBot = useSelector(state => state.bots.render)

	const navigate = useNavigate()
	// // check
	const tokenToCheck = localStorage.getItem('token')
	useEffect(() => {
		axiosBasic
			.post('/auth/check', tokenToCheck)
			.catch(() => navigate('/auth', { replace: true }))
	}, [tokenToCheck])

	useEffect(() => {}, [])

	useEffect(() => {
		axiosBasic.get('/statuses').then(res => {
			dispatch(statusesModel.actions.fetchStatuses(res.data.data))
		})
	}, [renderStatus])

	useEffect(() => {
		axiosBasic.get('/bots').then(res => {
			dispatch(botsModel.actions.fetchBots(res.data.data))
		})
	}, [bot.id, renderBot])

	return (
		<div className='flex items-start justify-around gap-5 p-5'>
			<Status renderStatus={renderStatus} setRenderStatus={setRenderStatus} />
			{bot.id ? <Bot /> : ''}
			<Create />
		</div>
	)
}

export default Settings
