import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFound.scss'

const NotFound = () => {
	const navigate = useNavigate()
	const goHome = () => {
		navigate('/auth', { replace: true })
	}
	return (
		<div className='flex-container'>
			<div className='text-center'>
				<h1>
					<span className='fade-in' id='digit1'>
						4
					</span>
					<span className='fade-in' id='digit2'>
						0
					</span>
					<span className='fade-in' id='digit3'>
						4
					</span>
				</h1>
				<h3 className='fadeIn'>PAGE NOT FOUND</h3>
				<button onClick={goHome} type='button' name='button'>
					Return To Home
				</button>
			</div>
		</div>
	)
}

export default NotFound
