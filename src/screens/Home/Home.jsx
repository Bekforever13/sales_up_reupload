import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosBasic from '../../services/axios/axiosBasic'
import StatusChart from './statusChart/StatusChart'
import CoursesChart from './coursesChart/CoursesChart'
import './Home.scss'

const Home = () => {
	const navigate = useNavigate()

	// check
	const tokenToCheck = localStorage.getItem('token')
	useEffect(() => {
		axiosBasic
			.post('/auth/check', tokenToCheck)
			.catch(() => navigate('/auth', { replace: true }))
	}, [tokenToCheck])

	return (
		<div className='home'>
			<div className='courses'>
				<CoursesChart />
			</div>
			<div className='statuses'>
				<StatusChart />
			</div>
		</div>
	)
}

export default Home
