import { Button } from 'antd/lib'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axiosBasic from '../../services/axios/axiosBasic'
import './Auth.scss'

const Auth = () => {
	const [currentUser, setCurrentUser] = useState({
		phone: '',
		password: '',
	})
	const [errorMessage, setErrorMessage] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const token = localStorage.getItem('token')

	// on click submit button
	const login = e => {
		e.preventDefault()
		axiosBasic
			.post('/auth/login', currentUser)
			.then(res => {
				localStorage.setItem('token', 'Bearer ' + res.data.data.token)
			})
			.catch(e => console.log(e.response))
			.finally(() => navigate('/'))
	}

	// check
	useEffect(() => {
		axiosBasic.post('/auth/check').then(() => navigate('/', { replace: true }))
	}, [])

	return (
		<div className='form__wrapper'>
			<form className='form'>
				<h1>Login</h1>
				{errorMessage !== '' ? (
					<h2 className='border-[1px] border-red-500 py-2 px-10 rounded-md'>
						{errorMessage}
					</h2>
				) : (
					''
				)}
				<input
					type='text'
					placeholder='Enter your phone number'
					onChange={e => {
						console.log(e.target.value)
						setCurrentUser({ ...currentUser, phone: e.target.value })
						setErrorMessage('')
					}}
					className='number'
				/>
				<input
					type='password'
					placeholder='Enter your password'
					onChange={e => {
						console.log(e.target.value)
						setCurrentUser({ ...currentUser, password: e.target.value })
					}}
					className='password'
				/>

				<Button
					className='w-full px-4 py-2 h-fit text-lg'
					style={{ backgroundColor: '#1976D2' }}
					type='primary'
					onClick={e => login(e)}
				>
					Submit
				</Button>
			</form>
		</div>
	)
}

export default Auth
