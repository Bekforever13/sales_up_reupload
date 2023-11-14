import { Button } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axiosBasic from '../../../../services/axios/axiosBasic'
import { botsModel } from '../../../../store/settingsModel/bot'

const Create = () => {
	const dispatch = useDispatch()
	const [newBot, setNewBot] = useState({
		token: '',
		username: '',
		contact: '',
	})

	const onSubmit = () => {
		axiosBasic
			.post('/bots', newBot)
			.then(res => {
				dispatch(botsModel.actions.render())
			})
			.finally(() =>
				setNewBot({
					token: '',
					username: '',
					contact: '',
				})
			)
	}

	return (
		<div className='flex-1 flex flex-col bg-white rounded-md shadow-md min-h-[200px] p-5'>
			<h2 className='text-2xl border-[#adadad] border-b-[1px] mb-5'>
				Create Bot
			</h2>
			<form className='flex flex-col gap-y-5'>
				<input
					type='text'
					className='border-[#adadad] outline-0 border-[1px] py-2 px-4 rounded-md text-lg'
					placeholder='Username...'
					value={newBot.username}
					onChange={e => setNewBot({ ...newBot, username: e.target.value })}
				/>
				<input
					type='text'
					className='border-[#adadad] outline-0 border-[1px] py-2 px-4 rounded-md text-lg'
					placeholder='Token...'
					value={newBot.token}
					onChange={e => setNewBot({ ...newBot, token: e.target.value })}
				/>
				<input
					type='text'
					className='border-[#adadad] outline-0 border-[1px] py-2 px-4 rounded-md text-lg'
					placeholder='Contact...'
					value={newBot.contact}
					onChange={e => setNewBot({ ...newBot, contact: e.target.value })}
				/>
				<Button onClick={onSubmit} type='primary' className='bg-[#1976D2]'>
					Create
				</Button>
			</form>
		</div>
	)
}

export default Create
